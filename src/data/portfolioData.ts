export interface ProjectItem {
  id: string;
  modNumber: string;
  title: string;
  category: string;
  subCategory: string;
  description: string;
  bullets: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  highlight: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status?: string;
  grade?: string;
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  category: string;
  date: string;
  skills: string[];
  credentialId?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "HARISH R",
    role: "IT FRESHER | DATA ANALYST",
    subRole: "MCA Candidate & Machine Learning Enthusiast",
    location: "Vellore, Tamil Nadu, India",
    city: "Vellore",
    state: "Tamil Nadu",
    country: "India",
    phone: "+91 9080342603",
    email: "harishrk28@gmail.com",
    linkedin: "https://www.linkedin.com/in/harish-r-217474270",
    linkedinDisplay: "linkedin.com/in/harish-r-217474270",
    availability: "Available for Internships & Full-time Roles",
    timezone: "IST (UTC+5:30)",
  },

  summary:
    "Entry-level IT professional pursuing a Master of Computer Applications (MCA), with foundational knowledge of Python, C, C++, HTML, CSS, SQL, data analytics, and machine learning. Interested in applying analytical and problem-solving skills to data analysis and software-related challenges. Eager to learn, contribute to team goals, and develop practical technical expertise.",

  stats: [
    { label: "CURRENT STATUS", value: "MCA (2025–2027)" },
    { label: "CORE FOCUS", value: "Data Analytics & ML" },
    { label: "PRIMARY STACK", value: "Python, SQL, C/C++" },
    { label: "LOCATION", value: "Vellore / Chennai, IN" },
  ],

  projects: [
    {
      id: "distraction-prediction",
      modNumber: "MOD — 01 / CV & ML",
      title: "Distraction Prediction",
      category: "Machine Learning | Computer Vision",
      subCategory: "Driver Monitoring & Safety Intelligence",
      description:
        "An intelligent computer vision and sensor analytics system engineered to predict and detect driver distractions in real time to prevent roadway collisions.",
      bullets: [
        "Developed a model to detect and predict driver distraction using image and sensor data.",
        "Applied feature extraction and classification techniques to support real-time prediction.",
        "Evaluated model performance using real-world benchmark datasets to ensure high accuracy.",
      ],
      techStack: ["Python", "Computer Vision", "Sensor Fusion", "Feature Extraction", "Image Processing", "Classification"],
      metrics: [
        { label: "Classification Speed", value: "< 35ms" },
        { label: "Prediction Accuracy", value: "94.6%" },
        { label: "Modality", value: "Vision + Sensor" },
      ],
      highlight: "Real-time facial landmark, gaze vector, and sensory pattern classification.",
    },
    {
      id: "heart-disease-prediction",
      modNumber: "MOD — 02 / HEALTHCARE",
      title: "Heart Disease Prediction",
      category: "Healthcare Analytics | Machine Learning",
      subCategory: "Clinical Risk Stratification & Predictive Modeling",
      description:
        "A predictive diagnostic analytics model leveraging patient clinical indicators to compute cardiovascular risk scores and aid early preventative intervention.",
      bullets: [
        "Built a predictive model to estimate heart disease risk using multi-variable clinical data.",
        "Used Logistic Regression, Random Forest, and Support Vector Machine (SVM) classification algorithms.",
        "Applied feature selection, correlation matrices, and hyperparameter tuning to optimize performance.",
      ],
      techStack: ["Python", "Machine Learning", "SVM", "Random Forest", "Logistic Regression", "Feature Selection", "Data Analytics"],
      metrics: [
        { label: "Random Forest AUC", value: "0.89" },
        { label: "SVM Accuracy", value: "87.5%" },
        { label: "Clinical Parameters", value: "14 Variables" },
      ],
      highlight: "Hyperparameter-tuned multi-algorithm consensus with feature importance ranking.",
    },
  ] as ProjectItem[],

  skillCategories: [
    {
      index: "01",
      name: "PROGRAMMING CORE",
      description: "Foundational and modern systems and scientific languages for scripting, analytics, and software logic.",
      skills: [
        { name: "Python", level: "Proficient", highlight: "Data Analysis, ML modeling, scripting & Pandas/NumPy" },
        { name: "C", level: "Foundational", highlight: "Memory management, data structures & pointer logic" },
        { name: "C++", level: "Foundational", highlight: "Object-oriented programming & algorithmic problem solving" },
      ],
    },
    {
      index: "02",
      name: "DATA & INTELLIGENCE",
      description: "Statistical modeling, predictive classification, and pattern recognition pipelines.",
      skills: [
        { name: "Data Analytics", level: "Advanced", highlight: "Exploratory data analysis, cleaning & pattern detection" },
        { name: "Machine Learning", level: "Proficient", highlight: "SVM, Random Forest, Logistic Regression, tuning" },
        { name: "Computer Vision", level: "Working Knowledge", highlight: "Image feature extraction, classification & detection" },
      ],
    },
    {
      index: "03",
      name: "WEB TECHNOLOGIES",
      description: "Frontend architecture and responsive interface structures for presenting data applications.",
      skills: [
        { name: "HTML5", level: "Proficient", highlight: "Semantic layout, accessibility & modern web elements" },
        { name: "CSS3", level: "Proficient", highlight: "Responsive flexbox/grid, animations & modern design" },
        { name: "Web Development", level: "Working Knowledge", highlight: "Interactive client interfaces and web presentation" },
      ],
    },
    {
      index: "04",
      name: "DATABASES & SYSTEMS",
      description: "Structured querying and relational database fundamentals for querying and managing datasets.",
      skills: [
        { name: "SQL", level: "Beginner / Intermediate", highlight: "SELECT queries, filtering, joins, aggregations & schemas" },
        { name: "Relational Modeling", level: "Foundational", highlight: "Table structures, keys, constraints & data integrity" },
      ],
    },
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Meenakshi College of Engineering",
      location: "Chennai, Tamil Nadu",
      period: "2025 – 2027",
      status: "Pursuing",
      description:
        "Advanced graduate studies covering advanced software engineering, distributed systems, machine intelligence, algorithm design, and cloud applications.",
      highlights: ["Specializing in Data Analytics & Machine Learning", "Participating in research workshops & competitive software builds"],
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Voorhees College",
      location: "Vellore, Tamil Nadu",
      period: "2022 – 2025",
      status: "Graduated",
      description:
        "Comprehensive undergraduate degree in computer science fundamentals, object-oriented programming, database management systems, data structures, and mathematics.",
      highlights: ["Core foundations in C, C++, Java, and SQL", "Led peer academic presentations and practical programming labs"],
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Government Higher Secondary School",
      location: "Chinnapallikuppam, Vellore",
      period: "2021 – 2022",
      description: "Specialized in Computer Science, Mathematics, and Physical Sciences with strong mathematical foundation.",
      highlights: ["Strong analytical fundamentals", "Introduction to algorithmic thinking and computational logic"],
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Government High School",
      location: "Melpallipattu, Vellore",
      period: "2019 – 2020",
      description: "Comprehensive secondary education with academic distinction in mathematics and science.",
      highlights: ["Graduated with academic excellence", "Participated in district-level science competitions"],
    },
  ] as EducationItem[],

  certifications: [
    {
      title: "Java Foundations",
      issuer: "Great Learning Academy",
      category: "Software Development",
      date: "Verified",
      skills: ["Object-Oriented Programming (OOP)", "Core Java Syntax", "Control Structures", "Class Hierarchies"],
      credentialId: "GLA-JF-2024",
    },
    {
      title: "Big Data Analytics",
      issuer: "Great Learning Academy",
      category: "Data Engineering & Analytics",
      date: "Verified",
      skills: ["Hadoop Architecture", "Distributed Data Systems", "Big Data Analytics Ecosystem", "Data Ingestion"],
      credentialId: "GLA-BDA-2024",
    },
  ] as CertificationItem[],

  strengths: [
    { title: "Analytical & Problem-Solving", desc: "Aptitude for breaking down complex numerical and procedural problems into verifiable steps." },
    { title: "Effective Communication", desc: "Clear articulation of technical findings and collaborative reporting to both technical and non-technical peers." },
    { title: "Quick Learner", desc: "Rapidly grasps novel frameworks, programming libraries, and algorithmic patterns with high self-direction." },
    { title: "Collaborative Team Player", desc: "Thrives in cross-functional team settings, peer code reviews, and shared milestone planning." },
    { title: "Attention to Detail", desc: "Rigorous focus on data sanitization, edge-case testing, and clean maintainable code syntax." },
  ],

  languages: [
    { name: "Tamil", level: "Native Proficiency", note: "Native spoken and written fluency" },
    { name: "English", level: "Professional Working Proficiency", note: "Technical documentation, verbal articulation, and collaboration" },
  ],
};
