import { StudentProfile, Project, Internship, Certification, Hackathon, Achievement, SecureDocument, LeaderboardUser } from "../types";

export const INITIAL_PROFILE: StudentProfile = {
  id: "alex-mercer",
  fullName: "Alex Mercer",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
  email: "alex.mercer@university.edu",
  department: "Computer Science & Engineering",
  yearOfStudy: "3rd Year",
  rollNumber: "CSE-2023-084",
  bio: "Passionate Full Stack Developer & AI enthusiast. Builder of developer tools, active in open-source, and deeply committed to competitive programming and algorithmic automation.",
  skills: ["React", "TypeScript", "Python", "Machine Learning", "Node.js", "Docker", "Algorithms", "UI/UX Design", "PostgreSQL"],
  talentScore: 92,
  rankings: {
    globalRank: 12,
    departmentRank: 3,
    collegeRank: 5
  },
  connectedProfiles: {
    github: "https://github.com/alexmercer-dev",
    linkedin: "https://linkedin.com/in/alex-mercer",
    leetcode: "https://leetcode.com/alex_mercer",
    hackerrank: "https://hackerrank.com/mercer_codes",
    skillrack: "https://skillrack.com/candidates/alex_m"
  },
  academics: {
    cgpa: 9.42,
    attendance: 94.6,
    semesterGpas: [
      { semester: "Sem 1", gpa: 9.1 },
      { semester: "Sem 2", gpa: 9.25 },
      { semester: "Sem 3", gpa: 9.5 },
      { semester: "Sem 4", gpa: 9.4 },
      { semester: "Sem 5", gpa: 9.62 },
      { semester: "Sem 6", gpa: 9.65 }
    ],
    classRank: 2,
    awards: ["Dean's Merit List 2024", "Academic Excellence Award in Data Structures"]
  }
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "NeuroDoc - AI Medical Image Analyzer",
    description: "An automated ML web engine designed to classify chest X-ray scans and identify pulmonary symptoms using PyTorch, Express, and Vite.",
    longDescription: "NeuroDoc uses visual transfer learning models (ResNet-50) to evaluate high-resolution lung radiography scans in under 1.2 seconds, complete with diagnostic Heatmaps and natural language report generation.",
    techStack: ["PyTorch", "React", "Typescript", "Node.js", "Docker", "Tailwind CSS"],
    githubUrl: "https://github.com/alexmercer-dev/neurodoc",
    liveUrl: "https://neurodoc-health.dev",
    teamMembers: ["Alex Mercer", "Sarah Jenkins", "Dr. Robert Chen"],
    duration: "3 Months (Spring 2025)",
    category: "AI/ML",
    awards: "Best Innovative Software - AI Hack 2025",
    stars: 420,
    forks: 54,
    commitsCount: 142,
    bannerUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj-2",
    title: "VaporStore: P2P Encrypted Cloud",
    description: "Distributed chunk-based file backup and storage ledger implementing military-grade AES-GCM encryption client-side.",
    longDescription: "VaporStore slices user assets into shards, encrypts them securely, and publishes them across a peer-to-peer network. Built utilizing Rust backend elements and compiled to WebAssembly for React integration.",
    techStack: ["React", "Rust", "WebAssembly", "IndexedDB", "Vite", "WebRTC"],
    githubUrl: "https://github.com/alexmercer-dev/vaporstore",
    liveUrl: "https://vaporstore.web.app",
    teamMembers: ["Alex Mercer", "Leon Kennedy"],
    duration: "2 Months",
    category: "Full Stack",
    awards: "Outstanding Engineering Award (CSE Dept)",
    stars: 189,
    forks: 21,
    commitsCount: 89,
    bannerUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "proj-3",
    title: "Z-Forge Mobile CAD Renderer",
    description: "Interactive visual responsive structural CAD compiler in Javascript rendering high fidelity mathematical meshes smoothly.",
    longDescription: "Z-Forge leverages canvas optimization math to read traditional SLDPRT files and display them with interactive mouse-driven vector angles at 60fps on mobile browsers.",
    techStack: ["React Native", "Three.js", "OpenGL", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/alexmercer-dev/z-forge",
    liveUrl: "https://zforge-renderer.app",
    teamMembers: ["Alex Mercer", "Tony Stark"],
    duration: "4 Months",
    category: "Mobile",
    stars: 75,
    forks: 12,
    commitsCount: 56,
    bannerUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600"
  }
];

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: "intern-1",
    companyName: "Stripe",
    role: "Core API Solutions Engineer Intern",
    duration: "Jun 2025 - Aug 2025 (3 Mos)",
    location: "San Francisco, CA",
    mode: "Hybrid",
    stipend: "₹8,500 / month",
    certificateUrl: "https://stripe.com/verify/intern/alex-mercer",
    description: "Developed developer portal telemetry trackers, overhauled custom webhook routing microservices, and speed-optimized SQL query performance by indexing key transaction tables.",
    skillsGained: ["Ruby on Rails", "Go", "AWS", "gRPC", "Redis", "Distributed Tuning"],
    logo: "💳"
  },
  {
    id: "intern-2",
    companyName: "Tesla AutoPilot Group",
    role: "Computer Vision Intern",
    duration: "Jan 2025 - Apr 2025 (4 Mos)",
    location: "Palo Alto, CA",
    mode: "Onsite",
    stipend: "₹7,200 / month",
    certificateUrl: "https://tesla.com/credentials/alexm",
    description: "Constructed deep semantic segmentation classifiers for camera obstacle prediction. Assisted in hyperparameter tuning models on ultra-large supercomputer frames.",
    skillsGained: ["C++", "PyTorch", "ROS", "Python", "Computer Vision", "Object Tracking"],
    logo: "⚡"
  }
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    title: "Google Cloud Certified Professional Cloud Architect",
    provider: "Google Cloud",
    issueDate: "Feb 2025",
    credentialId: "GCP-PCA-82910AA",
    verificationLink: "https://www.credential.net/gcp-pca-alex829",
    category: "Cloud",
    status: "Verified",
    badgeIcon: "☁️"
  },
  {
    id: "cert-2",
    title: "TensorFlow Developer Specialization Certification",
    provider: "DeepLearning.AI",
    issueDate: "Nov 2024",
    credentialId: "TF-DS-7341B",
    verificationLink: "https://coursera.org/verify/specialization/tf-alex-m",
    category: "AI",
    status: "Verified",
    badgeIcon: "🤖"
  },
  {
    id: "cert-3",
    title: "AWS Certified Solutions Architect – Associate",
    provider: "Amazon Web Services",
    issueDate: "Dec 2024",
    credentialId: "AWS-SAA-99014",
    verificationLink: "https://aws.certificated.com/verify/saa-alex",
    category: "Cloud",
    status: "Verified",
    badgeIcon: "📡"
  },
  {
    id: "cert-4",
    title: "Certified Kubernetes Administrator (CKA)",
    provider: "The Linux Foundation & CNCF",
    issueDate: "Mar 2025",
    credentialId: "CKA-33829B",
    verificationLink: "https://cncf.org/credentials/cka-mercer",
    category: "Cloud",
    status: "Verified",
    badgeIcon: "🐳"
  }
];

export const INITIAL_HACKATHONS: Hackathon[] = [
  {
    id: "hack-1",
    name: "CalHacks 11.0",
    venue: "UC Berkeley, California",
    date: "Oct 2024",
    projectBuilt: "Synapse-CAD: Kinetic 3D CAD via Voice Commands",
    teamMembers: ["Alex Mercer", "Rohan Mehta", "Yuki Sato"],
    position: "1st Place",
    cashPrize: "₹5,000 + NVIDIA H100 GPUs Access",
    judgeFeedback: "Spectacular real-time 3D performance using customized voice semantic-parsing pipelines. Production-ready layout.",
    photoUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "hack-2",
    name: "Uncommon Hacks 2025",
    venue: "University of Chicago",
    date: "Feb 2025",
    projectBuilt: "AuraFS - Sonic Wave Decentralized Vault",
    teamMembers: ["Alex Mercer", "Jane Doe"],
    position: "1st Place",
    cashPrize: "₹3,000",
    judgeFeedback: "Super creative concept. The integration of audio spatial verification keys shows massive technical curiosity.",
    photoUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "hack-3",
    name: "SheHacks & Global Inclusive Hack",
    venue: "Virtual (Global)",
    date: "Nov 2024",
    projectBuilt: "SignSpeak: Real-time Camera Hand Sign Translator",
    teamMembers: ["Alex Mercer", "Chloe Vance", "Maya Patel"],
    position: "2nd Place",
    cashPrize: "₹1,500",
    judgeFeedback: "Extremely high human impact with fluid translation and low latency.",
    photoUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600"
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "1st Place Rank in Regional Collegiate ACM-ICPC Preparation Showcase",
    category: "Technical Competition",
    date: "Jan 2025",
    organization: "Association for Computing Machinery",
    description: "Solved 9 algorithms problems out of 10 in under 3.5 hours, finishing top out of 180 registration boards.",
    badgeType: "🥇 Champion"
  },
  {
    id: "ach-2",
    title: "Published: Automated Dynamic Hyperplane Generation in Sparse Datasets",
    category: "Research Publication",
    date: "Dec 2024",
    organization: "IEEE Trans. on Pattern Analysis",
    description: "Showcased high-efficiency mathematical kernels optimizing training bounds on sparse neural layouts.",
    badgeType: "📚 Published Author"
  },
  {
    id: "ach-3",
    title: "Undergraduate Class Vice-Representative Selection",
    category: "Leadership",
    date: "Aug 2024",
    organization: "Student Council Board",
    description: "Successfully represents academic grievances of over 240 engineering undergraduates during corporate discussions.",
    badgeType: "🎖️ Student Leader"
  }
];

export const INITIAL_DOCUMENTS: SecureDocument[] = [
  {
    id: "doc-1",
    name: "Alex_Mercer_Elite_Resume_2026.pdf",
    category: "Resume",
    fileSize: "1.4 MB",
    uploadedAt: "May 20, 2026",
    fileType: "application/pdf"
  },
  {
    id: "doc-2",
    name: "Stripe_Internship_Offer_Verified.pdf",
    category: "Offer Letter",
    fileSize: "840 KB",
    uploadedAt: "Apr 12, 2026",
    fileType: "application/pdf"
  },
  {
    id: "doc-3",
    name: "Academic_Official_Transcript_Sem5.pdf",
    category: "Mark Sheet",
    fileSize: "3.2 MB",
    uploadedAt: "Feb 10, 2026",
    fileType: "application/pdf"
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  { rank: 1, name: "Pranav Pillai", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100", department: "Computer Science & Engineering", year: "4th Year", talentScore: 98, achievementsCount: 16, projectsCount: 12, cgpa: 9.87 },
  { rank: 2, name: "Srinidhi R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100", department: "Information Technology", year: "4th Year", talentScore: 96, achievementsCount: 14, projectsCount: 9, cgpa: 9.78 },
  { rank: 3, name: "Arjun Sharma", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100", department: "Electronics & Communication", year: "4th Year", talentScore: 94, achievementsCount: 11, projectsCount: 8, cgpa: 9.54 },
  { rank: 4, name: "Alex Mercer (You)", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100", department: "Computer Science & Engineering", year: "3rd Year", talentScore: 92, achievementsCount: 9, projectsCount: 3, cgpa: 9.42 },
  { rank: 5, name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100", department: "Computer Science & Engineering", year: "3rd Year", talentScore: 89, achievementsCount: 7, projectsCount: 5, cgpa: 9.35 },
  { rank: 6, name: "Kevin Lin", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100", department: "Artificial Intelligence & DS", year: "2nd Year", talentScore: 86, achievementsCount: 8, projectsCount: 4, cgpa: 9.12 },
  { rank: 7, name: "Nisha Patel", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100", department: "Information Technology", year: "3rd Year", talentScore: 85, achievementsCount: 6, projectsCount: 4, cgpa: 9.21 },
  { rank: 8, name: "Aditya Kumar", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=100", department: "Mechanical Engineering", year: "4th Year", talentScore: 83, achievementsCount: 5, projectsCount: 6, cgpa: 8.92 }
];

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Localstorage recovery error:", e);
  }
  return defaultValue;
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Localstorage save error:", e);
  }
}
