export interface StudentProfile {
  id: string;
  fullName: string;
  avatar: string;
  email: string;
  department: string;
  yearOfStudy: string;
  rollNumber: string;
  bio: string;
  skills: string[];
  gender?: string;
  talentScore: number;
  rankings: {
    globalRank: number;
    departmentRank: number;
    collegeRank: number;
  };
  connectedProfiles: {
    github: string;
    linkedin: string;
    leetcode: string;
    hackerrank: string;
    skillrack: string;
    codechef?: string;
    codeforces?: string;
  };
  academics: {
    cgpa: number;
    attendance: number;
    semesterGpas: { semester: string; gpa: number }[];
    classRank: number;
    awards: string[];
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  teamMembers: string[];
  duration: string;
  category: "Frontend" | "Backend" | "Full Stack" | "AI/ML" | "Cloud" | "Mobile";
  awards?: string;
  stars?: number;
  forks?: number;
  commitsCount?: number;
  bannerUrl: string;
}

export interface Internship {
  id: string;
  companyName: string;
  role: string;
  duration: string;
  location: string;
  mode: "Onsite" | "Remote" | "Hybrid";
  stipend: string;
  certificateUrl?: string;
  description: string;
  skillsGained: string[];
  logo: string;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  issueDate: string;
  credentialId: string;
  verificationLink: string;
  category: "AI" | "Cloud" | "Development" | "Cybersecurity" | "Data Science" | "Management";
  status: "Verified" | "Pending";
  badgeIcon: string;
}

export interface Hackathon {
  id: string;
  name: string;
  venue: string;
  date: string;
  projectBuilt: string;
  teamMembers: string[];
  position: "1st Place" | "2nd Place" | "3rd Place" | "Finalist" | "Participant";
  cashPrize?: string;
  certificateUrl?: string;
  judgeFeedback?: string;
  photoUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: "Technical Competition" | "Paper Presentation" | "Research Publication" | "Cultural" | "Sports" | "Leadership" | "Award";
  date: string;
  organization: string;
  description: string;
  badgeType: string;
}

export interface SecureDocument {
  id: string;
  name: string;
  category: "Resume" | "Certificate" | "Mark Sheet" | "ID Card" | "Recommendation Letter" | "Offer Letter" | "Bonafide";
  fileSize: string;
  uploadedAt: string;
  fileType: string;
  url?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  department: string;
  year: string;
  talentScore: number;
  achievementsCount: number;
  projectsCount: number;
  cgpa: number;
}
