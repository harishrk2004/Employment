export function resampleFloat32(
  input: Float32Array,
  inputSampleRate: number,
  targetSampleRate: number
): Float32Array {
  if (inputSampleRate === targetSampleRate) {
    return input;
  }
  const ratio = inputSampleRate / targetSampleRate;
  const outputLength = Math.floor(input.length / ratio);
  const output = new Float32Array(outputLength);
  for (let i = 0; i < outputLength; i++) {
    const position = i * ratio;
    const index = Math.floor(position);
    const frac = position - index;
    const s0 = input[index] ?? 0;
    const s1 = input[Math.min(index + 1, input.length - 1)] ?? s0;
    output[i] = s0 + (s1 - s0) * frac;
  }
  return output;
}

export function float32ToInt16Base64(float32: Float32Array): string {
  const bytes = new Uint8Array(float32.length * 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < float32.length; i++) {
    const clamped = Math.max(-1, Math.min(1, float32[i]));
    const int16 = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
    view.setInt16(i * 2, int16, true);
  }
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

export function base64Int16ToFloat32(base64: string): Float32Array<ArrayBuffer> {
  const binary = atob(base64);
  const byteLength = binary.length;
  const bytes = new Uint8Array(new ArrayBuffer(byteLength));
  for (let i = 0; i < byteLength; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const view = new DataView(bytes.buffer);
  const sampleCount = Math.floor(byteLength / 2);
  const float32 = new Float32Array(new ArrayBuffer(sampleCount * 4));
  for (let i = 0; i < sampleCount; i++) {
    float32[i] = view.getInt16(i * 2, true) / 32768;
  }
  return float32;
}

export class GaplessAudioPlayer {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private nextStartTime = 0;
  private activeSources = new Set<AudioBufferSourceNode>();
  private speakingChangeCb?: (speaking: boolean) => void;

  constructor(onSpeakingChange?: (speaking: boolean) => void) {
    this.speakingChangeCb = onSpeakingChange;
  }

  private ensureContext(): { ctx: AudioContext; analyser: AnalyserNode } {
    if (!this.ctx || this.ctx.state === "closed") {
      this.ctx = new AudioContext({ sampleRate: 24000 });
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.78;
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return { ctx: this.ctx, analyser: this.analyser! };
  }

  enqueuePcmBase64(base64: string): void {
    const samples = base64Int16ToFloat32(base64);
    if (samples.length === 0) return;

    const { ctx, analyser } = this.ensureContext();
    const audioBuffer = ctx.createBuffer(1, samples.length, 24000);
    audioBuffer.copyToChannel(samples, 0);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);

    const startTime = Math.max(ctx.currentTime + 0.02, this.nextStartTime);
    this.nextStartTime = startTime + audioBuffer.duration;

    const wasSpeaking = this.activeSources.size > 0;
    this.activeSources.add(source);
    if (!wasSpeaking) {
      this.speakingChangeCb?.(true);
    }

    source.onended = () => {
      this.activeSources.delete(source);
      if (this.activeSources.size === 0) {
        this.speakingChangeCb?.(false);
      }
    };

    source.start(startTime);
  }

  interrupt(): void {
    for (const source of this.activeSources) {
      try {
        source.stop();
      } catch {
        // Ignore already stopped source
      }
    }
    this.activeSources.clear();
    this.nextStartTime = 0;
    this.speakingChangeCb?.(false);
  }

  getFrequencyData(target: Uint8Array<ArrayBuffer>): boolean {
    if (!this.analyser || this.activeSources.size === 0) {
      return false;
    }
    this.analyser.getByteFrequencyData(target);
    return true;
  }

  dispose(): void {
    this.interrupt();
    if (this.ctx && this.ctx.state !== "closed") {
      void this.ctx.close();
    }
    this.ctx = null;
    this.analyser = null;
  }
}
