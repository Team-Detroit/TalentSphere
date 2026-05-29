import React, { useState, useEffect } from "react";
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_INTERNSHIPS,
  INITIAL_CERTIFICATIONS,
  INITIAL_HACKATHONS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_DOCUMENTS,
  LEADERBOARD_USERS,
  getStoredData,
  setStoredData
} from "../data/mockData";
import {
  StudentProfile,
  Project,
  Internship,
  Certification,
  Hackathon,
  Achievement,
  SecureDocument,
  LeaderboardUser
} from "../types";
import SonarRadarChart from "./SonarRadarChart";
import {
  LayoutDashboard,
  User,
  FolderCode,
  Sparkles,
  Award,
  Trophy,
  Activity,
  Briefcase,
  Code2,
  BookOpen,
  FileText,
  TrendingUp,
  ListOrdered,
  Settings as SettingsIcon,
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  Plus,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Coins,
  Globe,
  ExternalLink,
  Filter,
  CheckCircle2,
  PlusCircle,
  FileDown,
  ChevronDown,
  X,
  Compass,
  Zap,
  Info
} from "lucide-react";

interface DashboardProps {
  initialProfileData: any;
  onLogout: () => void;
}

type TabType =
  | "Dashboard"
  | "My Profile"
  | "Projects"
  | "Skills"
  | "Achievements"
  | "Hackathons"
  | "Internships"
  | "Certifications"
  | "Coding Profiles"
  | "Academic Records"
  | "Documents"
  | "Analytics"
  | "Leaderboard"
  | "Settings";

export default function Dashboard({ initialProfileData, onLogout }: DashboardProps) {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState<TabType>("Dashboard");
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const starter = { ...INITIAL_PROFILE };
    if (initialProfileData.fullName) starter.fullName = initialProfileData.fullName;
    if (initialProfileData.department) starter.department = initialProfileData.department;
    if (initialProfileData.yearOfStudy) starter.yearOfStudy = initialProfileData.yearOfStudy;
    if (initialProfileData.avatar) starter.avatar = initialProfileData.avatar;
    if (initialProfileData.skills && initialProfileData.skills.length > 0) starter.skills = initialProfileData.skills;
    return getStoredData<StudentProfile>("ts_profile", starter);
  });

  const [projects, setProjects] = useState<Project[]>(() =>
    getStoredData<Project[]>("ts_projects", INITIAL_PROJECTS)
  );
  const [internships, setInternships] = useState<Internship[]>(() =>
    getStoredData<Internship[]>("ts_internships", INITIAL_INTERNSHIPS)
  );
  const [certifications, setCertifications] = useState<Certification[]>(() =>
    getStoredData<Certification[]>("ts_certifications", INITIAL_CERTIFICATIONS)
  );
  const [hackathons, setHackathons] = useState<Hackathon[]>(() =>
    getStoredData<Hackathon[]>("ts_hackathons", INITIAL_HACKATHONS)
  );
  const [achievements, setAchievements] = useState<Achievement[]>(() =>
    getStoredData<Achievement[]>("ts_achievements", INITIAL_ACHIEVEMENTS)
  );
  const [documents, setDocuments] = useState<SecureDocument[]>(() =>
    getStoredData<SecureDocument[]>("ts_documents", INITIAL_DOCUMENTS)
  );

  // Layout states
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);

  // Forms draw-states
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddCertificateOpen, setIsAddCertificateOpen] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);
  const [isAddInternshipOpen, setIsAddInternshipOpen] = useState(false);
  const [isAddHackathonOpen, setIsAddHackathonOpen] = useState(false);
  const [isAddAchievementOpen, setIsAddAchievementOpen] = useState(false);

  // New Internship fields
  const [newIntCompany, setNewIntCompany] = useState("");
  const [newIntRole, setNewIntRole] = useState("");
  const [newIntDuration, setNewIntDuration] = useState("");
  const [newIntLocation, setNewIntLocation] = useState("");
  const [newIntMode, setNewIntMode] = useState("Remote");
  const [newIntStipend, setNewIntStipend] = useState("");
  const [newIntDesc, setNewIntDesc] = useState("");
  const [newIntSkills, setNewIntSkills] = useState("");

  // New Hackathon fields
  const [newHackName, setNewHackName] = useState("");
  const [newHackPosition, setNewHackPosition] = useState<Hackathon["position"]>("Finalist");
  const [newHackVenue, setNewHackVenue] = useState("");
  const [newHackDate, setNewHackDate] = useState("");
  const [newHackPrize, setNewHackPrize] = useState("");
  const [newHackProj, setNewHackProj] = useState("");
  const [newHackFeedback, setNewHackFeedback] = useState("");

  // New Achievement fields
  const [newAchTitle, setNewAchTitle] = useState("");
  const [newAchOrg, setNewAchOrg] = useState("");
  const [newAchCat, setNewAchCat] = useState<Achievement["category"]>("Award");
  const [newAchDesc, setNewAchDesc] = useState("");

  // Add project fields
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjDesc, setNewProjDesc] = useState("");
  const [newProjCategory, setNewProjCategory] = useState<Project["category"]>("Full Stack");
  const [newProjStack, setNewProjStack] = useState("");
  const [newProjGit, setNewProjGit] = useState("");
  const [newProjLive, setNewProjLive] = useState("");

  // Add Certificate fields
  const [newCertTitle, setNewCertTitle] = useState("");
  const [newCertProvider, setNewCertProvider] = useState("Google Cloud");
  const [newCertCategory, setNewCertCategory] = useState<Certification["category"]>("Cloud");
  const [newCertId, setNewCertId] = useState("");

  // Add Document fields
  const [newDocName, setNewDocName] = useState("");
  const [newDocCat, setNewDocCat] = useState<SecureDocument["category"]>("Resume");

  // Notifications mock lists
  const notificationsMock = [
    { id: 1, title: "Identity Verified ✓", body: "Academic Dean's Board verified Sem 5 transcript details.", time: "1h ago" },
    { id: 2, title: "Recruiter Viewed Portfolio", body: "Core Engineer lead from Stripe evaluated Z-Forge project repositories.", time: "4h ago" },
    { id: 3, title: "Hone your Profile Rating", body: "Link your HackerRank account URL to bump talent score beyond 94%.", time: "1d ago" }
  ];

  const messagesMock = [
    { id: 1, sender: "Prof. Anirudh Dev", message: "Congratulations on the CalHacks placement! Send me the summary.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=60" },
    { id: 2, sender: "Recruitment Desk (Tesla)", message: "Our autonomous system identified your segment prediction repo. Are you open next Spring?", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60" }
  ];

  // Persistent effect saves
  useEffect(() => {
    setStoredData("ts_profile", profile);
  }, [profile]);
  useEffect(() => {
    setStoredData("ts_projects", projects);
  }, [projects]);
  useEffect(() => {
    setStoredData("ts_internships", internships);
  }, [internships]);
  useEffect(() => {
    setStoredData("ts_certifications", certifications);
  }, [certifications]);
  useEffect(() => {
    setStoredData("ts_hackathons", hackathons);
  }, [hackathons]);
  useEffect(() => {
    setStoredData("ts_achievements", achievements);
  }, [achievements]);
  useEffect(() => {
    setStoredData("ts_documents", documents);
  }, [documents]);

  // Handle Quick Add Action Project
  const handleAddNewProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;

    const added: Project = {
      id: `proj-custom-${Date.now()}`,
      title: newProjTitle,
      description: newProjDesc || "Custom configured student pipeline project.",
      techStack: newProjStack ? newProjStack.split(",").map((s) => s.trim()) : ["React", "CSS"],
      githubUrl: newProjGit || "https://github.com/alexmercer-dev",
      liveUrl: newProjLive || "",
      teamMembers: ["You"],
      duration: "1 Month",
      category: newProjCategory,
      stars: Math.floor(Math.random() * 25),
      forks: Math.floor(Math.random() * 5),
      commitsCount: Math.floor(Math.random() * 45) + 5,
      bannerUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400"
    };

    setProjects([added, ...projects]);
    setIsAddProjectOpen(false);

    // Dynamic slight bump to profile parameters for gamification
    setProfile((prev) => ({
      ...prev,
      talentScore: Math.min(prev.talentScore + 2, 100)
    }));

    // Reset fields
    setNewProjTitle("");
    setNewProjDesc("");
    setNewProjStack("");
    setNewProjGit("");
    setNewProjLive("");
  };

  // Quick action Certificate
  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim()) return;

    const added: Certification = {
      id: `cert-custom-${Date.now()}`,
      title: newCertTitle,
      provider: newCertProvider,
      issueDate: "May 2026",
      credentialId: newCertId || `TS-CERT-${Math.floor(Math.random() * 90000) + 10000}`,
      verificationLink: "https://talentsphere.edu/verify",
      category: newCertCategory,
      status: "Verified",
      badgeIcon: "🏅"
    };

    setCertifications([added, ...certifications]);
    setIsAddCertificateOpen(false);

    // Bump score
    setProfile((prev) => ({
      ...prev,
      talentScore: Math.min(prev.talentScore + 1, 100)
    }));

    setNewCertTitle("");
    setNewCertId("");
  };

  // Quick Action Doc upload simulation
  const handleAddDocSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const extension = newDocCat === "Resume" ? "pdf" : "png";
    const added: SecureDocument = {
      id: `doc-custom-${Date.now()}`,
      name: newDocName.toLowerCase().endsWith(".pdf") ? newDocName : `${newDocName}.${extension}`,
      category: newDocCat,
      fileSize: "440 KB",
      uploadedAt: "May 29, 2026",
      fileType: `application/${extension}`
    };

    setDocuments([added, ...documents]);
    setIsAddDocOpen(false);
    setNewDocName("");
  };

  // Submit Handler for Internships
  const handleAddNewInternshipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntCompany.trim()) return;

    const added: Internship = {
      id: `intern-custom-${Date.now()}`,
      companyName: newIntCompany,
      role: newIntRole || "Engineer Trainee",
      duration: newIntDuration || "3 Months",
      location: newIntLocation || "Bengaluru",
      mode: newIntMode as Internship["mode"],
      stipend: newIntStipend || "No Stipend",
      description: newIntDesc || "Completed software operations log.",
      skillsGained: newIntSkills ? newIntSkills.split(",").map((s) => s.trim()) : ["Systems", "React"],
      logo: "🏢"
    };

    setInternships([added, ...internships]);
    setIsAddInternshipOpen(false);

    // Increment talent score on new verified internship entry
    setProfile((prev) => ({
      ...prev,
      talentScore: Math.min(prev.talentScore + 3, 100)
    }));

    // Reset
    setNewIntCompany("");
    setNewIntRole("");
    setNewIntDuration("");
    setNewIntLocation("");
    setNewIntMode("Remote");
    setNewIntStipend("");
    setNewIntDesc("");
    setNewIntSkills("");
  };

  // Submit Handler for Hackathons
  const handleAddNewHackathonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHackName.trim()) return;

    const added: Hackathon = {
      id: `hack-custom-${Date.now()}`,
      name: newHackName,
      position: newHackPosition,
      venue: newHackVenue || "Global Virtual Platform",
      date: newHackDate || "May 2026",
      cashPrize: newHackPrize || "",
      projectBuilt: newHackProj || "Innovative Cloud Prototype",
      teamMembers: ["You"],
      judgeFeedback: newHackFeedback || "Outstanding technical execution and presentation.",
      photoUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400"
    };

    setHackathons([added, ...hackathons]);
    setIsAddHackathonOpen(false);

    // Bump score
    setProfile((prev) => ({
      ...prev,
      talentScore: Math.min(prev.talentScore + 2, 100)
    }));

    // Reset
    setNewHackName("");
    setNewHackPosition("Finalist");
    setNewHackVenue("");
    setNewHackDate("");
    setNewHackPrize("");
    setNewHackProj("");
    setNewHackFeedback("");
  };

  // Submit Handler for Achievements
  const handleAddNewAchievementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchTitle.trim()) return;

    const added: Achievement = {
      id: `ach-custom-${Date.now()}`,
      title: newAchTitle,
      organization: newAchOrg || "TalentSphere Elite Board",
      category: newAchCat,
      date: "May 2026",
      description: newAchDesc || "Verified scholastic/industrial contribution.",
      badgeType: "Gold"
    };

    setAchievements([added, ...achievements]);
    setIsAddAchievementOpen(false);

    // Bump score
    setProfile((prev) => ({
      ...prev,
      talentScore: Math.min(prev.talentScore + 2, 100)
    }));

    // Reset
    setNewAchTitle("");
    setNewAchOrg("");
    setNewAchCat("Award");
    setNewAchDesc("");
  };

  // Toggle user themes
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Filter Search results across students, skills, projects
  const searchableKeys = [
    { category: "Profiles", text: "Alex Mercer", tab: "My Profile" },
    { category: "Skills", text: "React Integration", tab: "Skills" },
    { category: "Skills", text: "Machine Learning (PyTorch)", tab: "Skills" },
    { category: "Projects", text: "NeuroDoc Analyzer", tab: "Projects" },
    { category: "Projects", text: "VaporStore P2P Encrypted Ledger", tab: "Projects" },
    { category: "Certifications", text: "Google Professional Architect", tab: "Certifications" },
    { category: "Hackathons", text: "CalHacks 11.0 Win", tab: "Hackathons" }
  ];

  const searchResults = searchQuery
    ? searchableKeys.filter((item) =>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const prizeSum = hackathons.reduce((acc, h) => {
    if (!h.cashPrize) return acc;
    const cleanNum = parseInt(h.cashPrize.replace(/[^0-9]/g, ""));
    return isNaN(cleanNum) ? acc : acc + cleanNum;
  }, 0);

  // --- SUBVIEW RENDERING METHODS ---

  // Dashboard Home
  const renderDashboardHome = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        {/* Top welcome grid */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-900/15 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profile.avatar}
                className="h-14 w-14 rounded-xl border-2 border-cyan-40 w-14 object-cover"
                alt="Avatar"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border border-slate-950 flex items-center justify-center text-[10px]" title="Collegiate Verified">
                ✓
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">
                Welcome back, {profile.fullName} 👋
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Your profile index has been evaluated with the regional university grid. Last sync: 2026-05-29.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-left md:text-right">
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Global Rank</p>
              <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                #{profile.rankings.globalRank}
              </p>
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="text-left md:text-right">
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Dept. Rank</p>
              <p className="text-xl font-semibold text-white">#{profile.rankings.departmentRank}</p>
            </div>
          </div>
        </div>

        {/* Unified metrics scorecard deck */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* CGPA */}
          <div
            onClick={() => setActiveTab("Academic Records")}
            className="rounded-xl border border-white/5 bg-slate-950/65 p-4 hover:border-cyan-500/30 cursor-pointer transition-all flex flex-col justify-between h-28 relative group"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] uppercase font-bold tracking-wider font-sans">Aca. CGPA</span>
              <BookOpen className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-white">{profile.academics.cgpa}</h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Top 2% in year</p>
            </div>
          </div>

          {/* Projects */}
          <div
            onClick={() => setActiveTab("Projects")}
            className="rounded-xl border border-white/5 bg-slate-950/65 p-4 hover:border-indigo-500/30 cursor-pointer transition-all flex flex-col justify-between h-28 relative group"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] uppercase font-bold tracking-wider font-sans">Projects</span>
              <FolderCode className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-white">{projects.length}</h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">3 repositories synced</p>
            </div>
          </div>

          {/* Hackathons */}
          <div
            onClick={() => setActiveTab("Hackathons")}
            className="rounded-xl border border-white/5 bg-slate-950/65 p-4 hover:border-cyan-500/30 cursor-pointer transition-all flex flex-col justify-between h-28 relative group"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] uppercase font-bold tracking-wider font-sans">Hackathons</span>
              <Trophy className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-white">{hackathons.length}</h3>
              <p className="text-[10px] text-slate-450 text-slate-400 mt-0.5">{hackathons.filter(h => h.position === "1st Place").length} Champion designations</p>
            </div>
          </div>

          {/* Certifications */}
          <div
            onClick={() => setActiveTab("Certifications")}
            className="rounded-xl border border-white/5 bg-slate-950/65 p-4 hover:border-indigo-500/30 cursor-pointer transition-all flex flex-col justify-between h-28 relative group"
          >
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] uppercase font-bold tracking-wider font-sans">Vault Certs</span>
              <Award className="h-4 w-4 text-purple-400" />
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-extrabold text-white">{certifications.length}</h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Google Web & AI verified</p>
            </div>
          </div>
        </div>

        {/* Split grid: Radar Score and Student Summary Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Radar details */}
          <div className="lg:col-span-8">
            <SonarRadarChart overallScore={profile.talentScore} />
          </div>

          {/* Dynamic Unified Identity Card summary */}
          <div className="lg:col-span-4 rounded-2xl border border-white/5 bg-slate-950/65 p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-cyan-500/5 blur-[55px] pointer-events-none" />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-slate-400 font-mono text-[9px] uppercase tracking-wider">
                <span>Identity Scorecard</span>
                <span className="text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded">strength 92</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-sans">{profile.fullName}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-semibold text-cyan-400">{profile.department}</p>
                <p className="text-2xs text-slate-500 mt-0.5 font-mono">ID: {profile.rollNumber}</p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic bg-white/2 p-3 rounded-lg border border-white/5">
                &ldquo;{profile.bio}&rdquo;
              </p>

              {/* Verified badges */}
              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-wider font-mono text-slate-550 block text-slate-500">academic badges</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded bg-indigo-505/10 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-2xs font-semibold text-indigo-300">
                    🥇 CalHacks Leader
                  </span>
                  <span className="rounded bg-cyan-550/10 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 text-2xs font-semibold text-cyan-300">
                    📚 Published Author
                  </span>
                </div>
              </div>
            </div>

            {/* Platform accounts integrated icons line */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <Github className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-4 w-4 text-blue-400 hover:text-white cursor-pointer" />
              </div>
              <span className="text-[9px] font-mono text-slate-550 text-slate-500">talent-registry blockchain</span>
            </div>
          </div>

        </div>

        {/* Strengths ledger and quick tips alert */}
        <div className="rounded-xl border border-cyan-500/10 bg-cyan-950/10 p-4 flex gap-3 text-left">
          <Info className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-cyan-300">Profile Strengthening Strategy</h4>
            <p className="text-2xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Your "Cloud Architect" and "ResNet-50 Python Optimizer" are highly ranked. Adding verified Github links to these custom repositories will boost your global placement tier standing from Top 12% to Top 5% in computer science lists.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Profile View
  const renderMyProfile = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        
        {/* Cover Banner and details */}
        <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-slate-950/40">
          {/* Banner cover block */}
          <div className="h-40 bg-gradient-to-r from-indigo-900 to-cyan-900 relative">
            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px]" />
            <div className="absolute top-4 right-4 bg-slate-950/70 border border-white/10 rounded-lg px-3 py-1.5 text-2xs font-mono text-cyan-400">
              verified system registry
            </div>
          </div>

          {/* Details header block */}
          <div className="p-6 pt-0 relative flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
              <img
                src={profile.avatar}
                className="h-24 w-24 rounded-2xl border-4 border-slate-950 float-left object-cover bg-slate-900 shadow-2xl"
                alt="Avatar"
                referrerPolicy="no-referrer"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight">{profile.fullName}</h2>
                  <span className="rounded bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 text-2xs font-extrabold text-indigo-400">
                     Elite ranking
                  </span>
                </div>
                <p className="text-sm font-semibold text-cyan-350 text-cyan-400 mt-0.5">{profile.department}</p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 mt-2 font-mono">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Silicon Valley, CA</span>
                  <span>Registered: ID: {profile.rollNumber}</span>
                </div>
              </div>
            </div>

            <button
               onClick={() => setIsEditProfileOpen(true)}
               className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-2xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer mb-2 shrink-0 md:w-auto text-center"
            >
              Configure Identity Params
            </button>
          </div>
        </div>

        {/* Split info column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Bio segment */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 text-left">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">About Me</h3>
              <p className="text-sm text-slate-350 text-slate-300 leading-relaxed mt-3">
                {profile.bio}
              </p>
            </div>

            {/* active university semester GPA line details */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono mb-4">Scholastic Trend Ledger</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {profile.academics.semesterGpas.map((gpa, i) => (
                  <div key={i} className="rounded-xl bg-slate-900/40 border border-white/5 p-3 text-center">
                    <p className="text-[10px] text-slate-500 font-mono">{gpa.semester}</p>
                    <p className="text-sm font-extrabold text-cyan-400 mt-1">{gpa.gpa}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Skills chip index */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-550 text-slate-550 text-slate-500 font-mono mb-4">Unified Tech Tags</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s, idx) => (
                  <span key={idx} className="rounded bg-white/5 px-2.5 py-1 text-2xs text-slate-300 font-semibold hover:border-cyan-500/25 font-mono border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Connected nodes */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono mb-2">Connected Platforms</h3>
              {profile.connectedProfiles.github && (
                <a href={profile.connectedProfiles.github} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-white/2 hover:bg-white/5 p-3 border border-white/5 text-slate-300 hover:text-white transition-all text-xs">
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>GitHub Profile</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              )}
              {profile.connectedProfiles.linkedin && (
                <a href={profile.connectedProfiles.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-white/2 hover:bg-white/5 p-3 border border-white/5 text-slate-300 hover:text-white transition-all text-xs">
                  <div className="flex items-center gap-2 flex-1">
                    <Linkedin className="h-4 w-4 text-blue-400" />
                    <span className="truncate">LinkedIn profile</span>
                  </div>
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal for Edit Student Profile */}
        {isEditProfileOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 text-left relative shadow-2xl">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-base font-bold text-white mb-4">Edit Profile Metadata</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-2xs font-extrabold text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full rounded-xl border border-white/5 bg-slate-900 p-2.5 text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-2xs font-extrabold text-slate-500 uppercase tracking-widest">Department</label>
                  <input
                    type="text"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full rounded-xl border border-white/5 bg-slate-900 p-2.5 text-xs text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-2xs font-extrabold text-slate-500 uppercase tracking-widest">Short Biography</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full rounded-xl border border-white/5 bg-slate-900 p-2.5 text-xs text-white resize-none"
                  />
                </div>
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 text-xs font-bold text-white shadow-xl cursor-pointer"
                >
                  Save Profile Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Projects Subview Page
  const renderProjects = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Project Showcase</h2>
            <p className="text-xs text-slate-400 mt-1">
              Synchronize industrial work grids, team hackathon repos, and live vector compilers
            </p>
          </div>
          <button
            onClick={() => setIsAddProjectOpen(true)}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-2xs font-bold text-white shadow-lg cursor-pointer flex items-center gap-1.5 hover:scale-101 hover:brightness-110 transition-all font-sans"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </div>

        {/* Empty state conditional */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-12 text-center flex flex-col items-center gap-3">
            <Compass className="h-12 w-12 text-slate-600 animate-spin transition-all duration-1000" />
            <h3 className="text-sm font-semibold text-white">No Projects Added Yet</h3>
            <p className="text-xs text-slate-500">Link your personal repositories or add off-campus creations to boost talent metric ratings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 hover:border-cyan-500/25 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between h-[360px]">
                
                {/* Banner wrapper */}
                <div className="h-32 mb-4 rounded-xl overflow-hidden relative">
                  <img src={proj.bannerUrl} className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" alt={proj.title} />
                  <span className="absolute bottom-2 left-2 rounded bg-slate-950/85 text-[9px] font-mono text-cyan-400 border border-white/5 px-2 py-0.5">
                    {proj.category}
                  </span>
                </div>

                <div className="flex flex-col gap-1 z-10">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-extrabold text-white font-sans truncate">{proj.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">
                    {proj.description}
                  </p>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.techStack.slice(0, 4).map((tech, idx) => (
                      <span key={idx} className="rounded bg-indigo-500/5 px-1.5 py-0.5 text-[9px] text-indigo-300 font-mono">
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className="text-[9px] text-slate-500 font-mono">+{proj.techStack.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Git actions footer */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-slate-400">
                  <div className="flex items-center gap-3 text-[10px] font-mono">
                    <span className="flex items-center gap-0.5">★ {proj.stars || 0}</span>
                    <span>⑂ {proj.forks || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" title="Github repository" className="text-slate-400 hover:text-white transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" title="Live verification Link" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Modal custom add project drawer */}
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 p-6 text-left relative shadow-2xl">
              <button
                onClick={() => setIsAddProjectOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h3 className="text-base font-bold text-white mb-1">Link New Project Asset</h3>
              <p className="text-2xs text-slate-550 text-slate-500 mb-4">Introduce repository details to sync system telemetry statistics</p>
              
              <form onSubmit={handleAddNewProjectSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Project Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Synapse API Engine"
                      value={newProjTitle}
                      onChange={(e) => setNewProjTitle(e.target.value)}
                      className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Category</label>
                    <select
                      value={newProjCategory}
                      onChange={(e) => setNewProjCategory(e.target.value as Project["category"])}
                      className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-slate-300"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Cloud">Cloud</option>
                      <option value="Mobile">Mobile</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Short description</label>
                  <input
                    type="text"
                    required
                    placeholder="Short summary highlighting technical innovations"
                    value={newProjDesc}
                    onChange={(e) => setNewProjDesc(e.target.value)}
                    className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tech stack tag list (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. React, Docker, Python, Rust"
                    value={newProjStack}
                    onChange={(e) => setNewProjStack(e.target.value)}
                    className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Github URL</label>
                    <input
                      type="url"
                      placeholder="https://github.com/..."
                      value={newProjGit}
                      onChange={(e) => setNewProjGit(e.target.value)}
                      className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Live URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://live-example.com"
                      value={newProjLive}
                      onChange={(e) => setNewProjLive(e.target.value)}
                      className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-550 py-3 text-xs font-bold text-white shadow-xl"
                >
                  Confirm and Sync Core telemetry
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Skills subview section
  const renderSkills = () => {
    const categories = [
      { name: "Frontend Architecture", score: 94, tech: "React, TS, Tailwinds, Next.js, Redux, Three.js", color: "from-cyan-500 to-blue-500" },
      { name: "Backend Engines & DBs", score: 88, tech: "Prisma, Go, Node.js, Ruby, PostgreSQL, Redis, gRPC", color: "from-indigo-500 to-purple-500" },
      { name: "Machine Learning models", score: 90, tech: "PyTorch, CUDA cores, TensorFlow, Scikit-learn", color: "from-orange-500 to-amber-500" },
      { name: "Cloud & Devops grids", score: 80, tech: "AWS Cloud, Kubernetes setups, Docker containers, Github workflows", color: "from-emerald-500 to-teal-500" }
    ];

    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Visual Skill Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic competencies catalog indexed by code verification and evaluation tests
          </p>
        </div>

        {/* Categories bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex flex-col justify-between h-[180px]">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-white font-sans">{cat.name}</h4>
                  <span className="text-xs font-bold text-cyan-400">{cat.score}% Core Ready</span>
                </div>
                <p className="text-[11px] text-slate-450 text-slate-400 leading-normal mt-2.5">
                  Verified proficiency elements: <span className="text-slate-300 font-mono font-medium">{cat.tech}</span>
                </p>
              </div>

              {/* Progress visual */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${cat.color}`} style={{ width: `${cat.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global interactive skill map simulator */}
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono mb-4">Competency Radar cloud</h3>
          <div className="flex flex-wrap gap-2.5">
            {profile.skills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-950/5 text-xs text-cyan-300 font-medium hover:border-cyan-400 transition-all cursor-pointer"
              >
                ✓ Verified Competency Name: {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Internships subview Page
  const renderInternships = () => {
    return (
      <>
        <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Professional Internships Timeline</h2>
          <p className="text-xs text-slate-400 mt-1">
            Industrial deployment logs and global software core operations experience
          </p>
        </div>

        <div className="relative border-l border-white/5 pl-6 ml-4 space-y-8 text-left">
          {internships.map((intern) => (
            <div key={intern.id} className="relative group">
              {/* Dot indicator */}
              <div className="absolute -left-[35px] top-1.5 h-4 w-4 rounded-full bg-indigo-505 bg-indigo-650 border-4 border-slate-950 group-hover:scale-125 transition-transform" />

              <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 hover:border-indigo-500/25 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5">
                      {intern.logo}
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-white font-sans">{intern.companyName}</h4>
                      <p className="text-xs text-cyan-400 mt-0.5">{intern.role}</p>
                    </div>
                  </div>
                  <span className="text-2xs font-mono bg-white/5 rounded px-2.5 py-1 text-slate-400">
                    {intern.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-[11px] text-slate-400 font-mono">
                  <span>📍 {intern.location} ({intern.mode})</span>
                  <span>💰 Stipend: {intern.stipend}</span>
                </div>

                <p className="mt-3 text-xs text-slate-400 leading-relaxed leading-normal border-t border-white/5 pt-3">
                  {intern.description}
                </p>

                {/* Skills indicators */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {intern.skillsGained.map((s, idx) => (
                    <span key={idx} className="rounded bg-white/5 px-2 py-0.5 text-2xs text-slate-400 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import Internship Modal drawer */}
      {isAddInternshipOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-none border-2 border-white bg-black p-6 text-left relative shadow-[4px_4px_0px_#ffffff] font-mono">
            <button
              onClick={() => setIsAddInternshipOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-black"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-sm font-black uppercase text-white mb-1">[ ADD INTERNSHIP ]</h3>
            <p className="text-[10px] text-slate-400 mb-4 font-mono">LOG NEW INDUSTRIAL EMPLOYMENT CONTRACT DETAILS</p>
            
            <form onSubmit={handleAddNewInternshipSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#22c55e]">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tesla India"
                  value={newIntCompany}
                  onChange={(e) => setNewIntCompany(e.target.value)}
                  className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-[#22c55e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Role / Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Systems Engineer Trainee"
                    value={newIntRole}
                    onChange={(e) => setNewIntRole(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 3 Months"
                    value={newIntDuration}
                    onChange={(e) => setNewIntDuration(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col col-span-2 gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, US"
                    value={newIntLocation}
                    onChange={(e) => setNewIntLocation(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Mode</label>
                  <select
                    value={newIntMode}
                    onChange={(e) => setNewIntMode(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-2 py-2 text-xs text-white outline-none"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Stipend Rate</label>
                  <input
                    type="text"
                    placeholder="e.g. $4,000 / month"
                    value={newIntStipend}
                    onChange={(e) => setNewIntStipend(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Skills Gained</label>
                  <input
                    type="text"
                    placeholder="e.g. React, C++, PyTorch"
                    value={newIntSkills}
                    onChange={(e) => setNewIntSkills(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#22c55e]">Core Contributions Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe your engineering role and main system accomplishments..."
                  value={newIntDesc}
                  onChange={(e) => setNewIntDesc(e.target.value)}
                  className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full border-2 border-white bg-[#22c55e] hover:bg-emerald-450 py-2.5 text-xs font-black text-black uppercase cursor-pointer transition-transform hover:translate-y-[-1px]"
              >
                Confirm and Sync Internship Ledger
              </button>
            </form>
          </div>
        </div>
      )}
      </>
    );
  };

  // Certification Vault Page
  const renderCertifications = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Certification Vault</h2>
            <p className="text-xs text-slate-400 mt-1">
              Globally validated authority nodes for cloud architects, machine learning, and structures
            </p>
          </div>
          <button
            onClick={() => setIsAddCertificateOpen(true)}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-4 py-2.5 text-2xs font-bold text-white shadow-lg cursor-pointer flex items-center gap-1.5 font-sans"
          >
            <Plus className="h-4 w-4" /> Import Credential
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="rounded-2xl border border-white/5 bg-slate-950/65 p-6 hover:border-cyan-500/25 transition-all flex flex-col justify-between h-[180px]">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 shrink-0">
                      {cert.badgeIcon}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-sans line-clamp-1">{cert.title}</h4>
                      <p className="text-[10px] text-indigo-400 mt-0.5 font-semibold uppercase">{cert.provider}</p>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-mono bg-emerald-500/10 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/15">
                    Verified ID✓
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] text-slate-400 font-mono">
                  <span>Issued Date: {cert.issueDate}</span>
                  <span className="truncate">ID: {cert.credentialId}</span>
                </div>
              </div>

              {/* download preview action line */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-650 text-slate-500">Secured with TalentSphere Registry</span>
                {cert.verificationLink && (
                  <a href={cert.verificationLink} target="_blank" rel="noreferrer" className="text-2xs font-bold text-cyan-405 text-cyan-400 flex items-center gap-1 hover:underline">
                    View Verification Ledger <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Import Cert Modal drawer */}
        {isAddCertificateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-950 p-6 text-left relative shadow-2xl">
              <button
                onClick={() => setIsAddCertificateOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-4">Import Verified Credential</h3>
              
              <form onSubmit={handleAddCertSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-404 text-slate-400">Certification Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AWS Solutions Architect Professional"
                    value={newCertTitle}
                    onChange={(e) => setNewCertTitle(e.target.value)}
                    className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400">Provider Authority</label>
                    <select
                      value={newCertProvider}
                      onChange={(e) => setNewCertProvider(e.target.value)}
                      className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                    >
                      <option value="Google Cloud">Google Cloud</option>
                      <option value="Amazon Web Services">Amazon Web Services</option>
                      <option value="TensorFlow Dev">TensorFlow Dev</option>
                      <option value="Linux Foundation">Linux Foundation</option>
                      <option value="Microsoft Azure">Microsoft Azure</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-slate-404 text-slate-400">Sphere Category</label>
                    <select
                      value={newCertCategory}
                      onChange={(e) => setNewCertCategory(e.target.value as Certification["category"])}
                      className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                    >
                      <option value="Cloud">Cloud</option>
                      <option value="AI">AI</option>
                      <option value="Development">Development</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Credential Verification ID</label>
                  <input
                    type="text"
                    placeholder="e.g. AWS-SAA-99014"
                    value={newCertId}
                    onChange={(e) => setNewCertId(e.target.value)}
                    className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-650 to-cyan-500 bg-indigo-600 hover:bg-indigo-550 py-3 text-xs font-bold text-white shadow-xl"
                >
                  Import and Verify Credential
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Hackathons subview page
  const renderHackathons = () => {
    return (
      <>
        <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Hackathon Hub</h2>
          <p className="text-xs text-slate-400 mt-1">
            National high intensity development competitions and structural team prototype victories
          </p>
        </div>

        {/* Global hack stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Participations</span>
            <h4 className="text-xl font-extrabold text-white mt-1">{hackathons.length} Event files</h4>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Champion Wins</span>
            <h4 className="text-xl font-extrabold text-amber-400 mt-1">
              🏆 {hackathons.filter(h => h.position === "1st Place").length} Champion designations
            </h4>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-mono">Won Cash Rewards</span>
            <h4 className="text-xl font-extrabold text-emerald-400 mt-1">${prizeSum.toLocaleString()} USD</h4>
          </div>
        </div>

        {/* Hackathon log cards */}
        <div className="space-y-6">
          {hackathons.map((hack) => (
            <div key={hack.id} className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex flex-col md:flex-row gap-6 relative group">
              
              {/* Photo representation */}
              {hack.photoUrl && (
                <div className="h-32 w-full md:w-44 rounded-xl overflow-hidden shrink-0 relative">
                  <img src={hack.photoUrl} className="h-full w-full object-cover group-hover:scale-105 transition-all duration-300" alt={hack.name} />
                </div>
              )}

              <div className="flex-1 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-sm font-extrabold text-white font-sans">{hack.name}</h4>
                    <span className="rounded bg-amber-500/10 px-2 py-0.5 text-2xs font-extrabold text-amber-400 border border-amber-500/25">
                      {hack.position}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 mt-1.5 font-mono">
                    <span>🏢 Venue: {hack.venue}</span>
                    <span>📅 Date: {hack.date}</span>
                    {hack.cashPrize && (
                      <span className="text-emerald-400 font-bold">💰 Prize: {hack.cashPrize}</span>
                    )}
                  </div>
                </div>

                <div className="mt-3 bg-white/2 rounded-xl p-3 border border-white/5 text-xs text-slate-300">
                  <p className="font-bold text-white">Project Built: {hack.projectBuilt}</p>
                  {hack.judgeFeedback && (
                    <p className="mt-1 text-[11px] text-slate-450 text-slate-400">
                      💡 Review Team feedback: &ldquo;{hack.judgeFeedback}&rdquo;
                    </p>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Import Hackathon Modal drawer */}
      {isAddHackathonOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-none border-2 border-white bg-black p-6 text-left relative shadow-[4px_4px_0px_#ffffff] font-mono">
            <button
              onClick={() => setIsAddHackathonOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-black"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-sm font-black uppercase text-white mb-1">[ ADD HACKATHON ]</h3>
            <p className="text-[10px] text-slate-400 mb-4 font-mono">LOG NATIONAL TEAM PROTOTYPE COMPETITION RESULTS</p>
            
            <form onSubmit={handleAddNewHackathonSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#22c55e]">Hackathon Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart India Hackathon"
                  value={newHackName}
                  onChange={(e) => setNewHackName(e.target.value)}
                  className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-[#22c55e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Result Placement</label>
                  <select
                    value={newHackPosition}
                    onChange={(e) => setNewHackPosition(e.target.value as Hackathon["position"])}
                    className="border-2 border-white bg-[#020e06] px-2 py-2 text-xs text-white outline-none"
                  >
                    <option value="1st Place">🏆 1st Place Champion</option>
                    <option value="2nd Place">🏅 2nd Place Runner-up</option>
                    <option value="3rd Place">🥉 3rd Place Finish</option>
                    <option value="Finalist">📢 Grand Finalist</option>
                    <option value="Participant">🤝 Participant</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Cash Reward (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. $1,500"
                    value={newHackPrize}
                    onChange={(e) => setNewHackPrize(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Venue / Host</label>
                  <input
                    type="text"
                    placeholder="e.g. IIT Madras"
                    value={newHackVenue}
                    onChange={(e) => setNewHackVenue(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[#22c55e]">Date Of Event</label>
                  <input
                    type="text"
                    placeholder="e.g. March 2026"
                    value={newHackDate}
                    onChange={(e) => setNewHackDate(e.target.value)}
                    className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#22c55e]">Project Built Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Wildfire Predictor drone"
                  value={newHackProj}
                  onChange={(e) => setNewHackProj(e.target.value)}
                  className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-bold text-[#22c55e]">Judges Review / Feedback</label>
                <textarea
                  rows={2}
                  placeholder="Review committee feedback..."
                  value={newHackFeedback}
                  onChange={(e) => setNewHackFeedback(e.target.value)}
                  className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full border-2 border-white bg-[#22c55e] hover:bg-emerald-450 py-2.5 text-xs font-black text-black uppercase cursor-pointer transition-transform hover:translate-y-[-1px]"
              >
                Confirm and Sync Hackathon Record
              </button>
            </form>
          </div>
        </div>
      )}
      </>
    );
  };

  // Academic transcripts and GPAs view
  const renderAcademicRecords = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Academic Records</h2>
          <p className="text-xs text-slate-404 text-slate-400 mt-1">
            Official scholastic transcripts, registered semester consistency, and department metrics
          </p>
        </div>

        {/* Global CGPA readout cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex items-center justify-between">
            <div>
              <span className="text-2xs uppercase tracking-wider text-slate-555 text-slate-500 font-mono">cumulative CGPA</span>
              <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mt-1">
                {profile.academics.cgpa} / 10
              </h3>
            </div>
            <span className="rounded-full bg-cyan-500/10 h-10 w-10 flex items-center justify-center text-cyan-400 border border-cyan-500/15">
              ✓
            </span>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex items-center justify-between">
            <div>
              <span className="text-2xs uppercase tracking-wider text-slate-555 text-slate-500 font-mono">Department Rank</span>
              <h3 className="text-3xl font-extrabold text-white mt-1">
                #{profile.academics.classRank}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">Top 1.5%</span>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex items-center justify-between">
            <div>
              <span className="text-2xs uppercase tracking-wider text-slate-555 text-slate-550 text-slate-500 font-mono">Class Attendance</span>
              <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">
                {profile.academics.attendance}%
              </h3>
            </div>
            <span className="text-xs text-emerald-350 text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Optimal</span>
          </div>
        </div>

        {/* Trend list diagram */}
        <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6 text-left">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono mb-4">Semester Trend records</h3>
          <div className="space-y-3.5">
            {profile.academics.semesterGpas.map((gpa, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-slate-200">{gpa.semester} record details</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 font-mono">{gpa.gpa} GPA</span>
                  <div className="h-2 w-24 rounded-full bg-slate-900 overflow-hidden shrink-0 hidden sm:block">
                    <div className="h-full rounded-full bg-cyan-400" style={{ width: `${gpa.gpa * 10}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Secure document vault Page
  const renderDocuments = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Document Center</h2>
            <p className="text-xs text-slate-400 mt-1">
              Store, view, and certify academic transcripts, resume models, recommendation letters, and certificates securely
            </p>
          </div>
          <button
            onClick={() => setIsAddDocOpen(true)}
            className="rounded-xl bg-gradient-to-r from-indigo-650 to-cyan-500 bg-indigo-600 hover:bg-indigo-550 px-4 py-2.5 text-2xs font-bold text-white shadow-lg cursor-pointer flex items-center gap-1.5 font-sans"
          >
            <Plus className="h-4 w-4" /> Secure Upload
          </button>
        </div>

        {/* Document grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 hover:border-cyan-500/25 transition-all text-left flex flex-col justify-between h-[160px]">
              <div>
                <div className="flex items-center justify-between text-slate-500">
                  <span className="rounded bg-slate-900 px-2 py-0.5 text-[9px] font-mono text-cyan-400 border border-white/5">
                    {doc.category}
                  </span>
                  <FileText className="h-4 w-4 text-slate-400" />
                </div>
                <h4 className="text-xs font-bold text-white mt-3 truncate font-sans">{doc.name}</h4>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-mono">
                  <span>Size: {doc.fileSize}</span>
                  <span>Uploaded: {doc.uploadedAt}</span>
                </div>
              </div>

              {/* simulated actions */}
              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-555 text-slate-500">AES-256 Encrypted secure file</span>
                <button
                  onClick={() => alert(`Simulating download transaction for security file node ${doc.name}. Encrypted payload compiled.`)}
                  className="rounded bg-white/5 hover:bg-white/10 px-2 py-1 text-2xs font-bold text-slate-350 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <FileDown className="h-3 w-3" /> Download file
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mock custom doc upload drawer */}
        {isAddDocOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-950 p-6 text-left relative shadow-2xl">
              <button
                onClick={() => setIsAddDocOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-4">Secure Cryptographic Upload</h3>
              
              <form onSubmit={handleAddDocSubmit} className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-404 text-slate-400">Document Identifier Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stanford_Recommendation_Letter"
                    value={newDocName}
                    onChange={(e) => setNewDocName(e.target.value)}
                    className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400">Vault Category type</label>
                  <select
                    value={newDocCat}
                    onChange={(e) => setNewDocCat(e.target.value as SecureDocument["category"])}
                    className="rounded-lg border border-white/5 bg-slate-900 px-3 py-2 text-xs text-white"
                  >
                    <option value="Resume">Resume Model Document</option>
                    <option value="Certificate">Certificate Registry</option>
                    <option value="Mark Sheet">University Mark Sheet</option>
                    <option value="ID Card">Scholastic ID Card</option>
                    <option value="Recommendation Letter">Recommendation Letter (LoR)</option>
                    <option value="Offer Letter">Internship Offer Letter</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-650 bg-indigo-600 hover:bg-indigo-550 py-3 text-xs font-bold text-white shadow-xl"
                >
                  Upload and Encrypt file payload
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Modern Leaderboard list view of elite users on database
  const renderLeaderboard = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Top Student Talent rank board</h2>
          <p className="text-xs text-slate-400 mt-1">
            National evaluation ranks of university profiles based on integrated coding scores, hackathons, and academically verified CGPA
          </p>
        </div>

        {/* Global leader list */}
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead className="bg-white/2 border-b border-white/5 text-slate-450 uppercase font-bold text-slate-550 text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 pl-6 text-center">Rank</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Department & Class</th>
                  <th className="p-4 text-center">Talent score</th>
                  <th className="p-4 text-center">Certs / Projs</th>
                  <th className="p-4 text-center">CGPA Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 val-middle">
                {LEADERBOARD_USERS.map((user, idx) => {
                  const isUserSelf = user.name.includes("Alex Mercer");
                  return (
                    <tr
                      key={idx}
                      className={`hover:bg-white/2 transition-colors ${
                        isUserSelf ? "bg-indigo-950/20 text-white font-semibold" : ""
                      }`}
                    >
                      <td className="p-4 pl-6 text-center font-bold text-slate-350">
                        {user.rank === 1 && "🥇"}
                        {user.rank === 2 && "🥈"}
                        {user.rank === 3 && "🥉"}
                        {user.rank > 3 && `#${user.rank}`}
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        <img src={user.avatar} className="h-8 w-8 rounded-lg object-cover shrink-0 bg-slate-900" alt={user.name} />
                        <div>
                          <p className="font-semibold text-slate-100">{user.name}</p>
                        </div>
                      </td>
                      <td className="p-4 text-slate-400 text-xs">
                        <span className="font-medium text-slate-300 block">{user.department}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{user.year}</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 font-extrabold text-indigo-400 font-mono">
                          {user.talentScore}%
                        </span>
                      </td>
                      <td className="p-4 text-center text-slate-400 font-mono">
                        {user.achievementsCount} Certs / {user.projectsCount} Projs
                      </td>
                      <td className="p-4 text-center font-bold text-cyan-400 font-mono">
                        {user.cgpa} / 10
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Growth Analytics section
  const renderAnalytics = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">Growth & Career Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">
            System performance telemetry evaluating industry readiness benchmarks
          </p>
        </div>

        {/* Readiness progress rings cards row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex flex-col justify-between h-[180px]">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500 font-mono">Career Readiness Quotient</span>
              <h4 className="text-2xl font-black text-emerald-400 mt-2">Core score: 94% optimal</h4>
            </div>
            <p className="text-[11px] text-slate-404 text-slate-400 leading-relaxed leading-normal border-t border-white/5 pt-3">
              Your "Full Stack" and "Distributed Ledger" repositories indicate extremely high levels of system design competence.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex flex-col justify-between h-[180px]">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500 font-mono">Verified Credential Index</span>
              <h4 className="text-2xl font-black text-indigo-400 mt-2">Verified level 4 nodes</h4>
            </div>
            <p className="text-[11px] text-slate-404 text-slate-400 leading-relaxed leading-normal border-t border-white/5 pt-3">
              Google Cloud Architect, TensorFlow and AWS solutions certifications are cryptographically authenticated via external registry.
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 flex flex-col justify-between h-[180px]">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500 font-mono">Algorithmic Talent ranking</span>
              <h4 className="text-2xl font-black text-cyan-400 mt-2">Continuous Top 4% Bracket</h4>
            </div>
            <p className="text-[11px] text-slate-404 text-slate-400 leading-relaxed leading-normal border-t border-white/5 pt-3">
              Your LeetCode record solve rate surpasses 400 problems under continuous competitive time checks.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Fallback Settings panel page
  const renderSettings = () => {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">System configuration Settings</h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure student platform parameters, sync connected platform API keys, or download verified credentials backup
          </p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 space-y-6 text-left">
          
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white font-sans">Primary Identity Theme</h4>
            <div className="flex gap-4">
              <button
                onClick={() => setThemeMode("dark")}
                className={`rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  themeMode === "dark" ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                🪐 Deep Cosmic Indigo (Dark Mode)
              </button>
              <button
                onClick={() => setThemeMode("light")}
                className={`rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                  themeMode === "light" ? "bg-cyan-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                🌞 Premium Clean Daylight (Light Mode)
              </button>
            </div>
          </div>

          <div className="h-[1px] bg-white/5" />

          {/* Section 2 */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white font-sans">Integrity & Backup Records</h4>
            <p className="text-xs text-slate-400">
              Download your complete verified profile ledger compiled as a portable encrypted JSON payload. Ready for transfer to partner universities.
            </p>
            <button
              onClick={() => alert("Simulating complete JSON identity export payload. File TalentSphere_Registry_Backup.json downloaded.")}
              className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-xs text-slate-200 font-bold transition-all"
            >
              Export JSON credentials backup
            </button>
          </div>

        </div>
      </div>
    );
  };

  const renderOtherTabs = () => {
    // Return empty states or descriptions for secondary lists to ensure full coverage
    return (
      <div className="flex flex-col gap-6 animate-fadeIn">
        <div>
          <h2 className="text-xl font-extrabold text-white font-sans tracking-tight">{activeTab} Section</h2>
          <p className="text-xs text-slate-450 text-slate-400 mt-1">
            Manage, verify, and streamline your digital identity records
          </p>
        </div>

        {activeTab === "Achievements" && (
          <>
            <div className="space-y-4 text-left">
              {achievements.map((ach) => (
                <div key={ach.id} className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 hover:border-indigo-500/20 transition-all flex items-start gap-4">
                  <span className="text-xl h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/15 text-indigo-400">
                    🏆
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 font-sans">{ach.title}</h4>
                    <p className="text-2xs text-cyan-400 font-semibold font-mono mt-0.5">{ach.category} // Verified by {ach.organization}</p>
                    <p className="text-xs text-slate-400 leading-normal leading-relaxed mt-2">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Import Achievement Modal drawer */}
            {isAddAchievementOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
                <div className="w-full max-w-md rounded-none border-2 border-white bg-black p-6 text-left relative shadow-[4px_4px_0px_#ffffff] font-mono">
                  <button
                    onClick={() => setIsAddAchievementOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white font-black"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <h3 className="text-sm font-black uppercase text-white mb-1">[ ADD ACHIEVEMENT ]</h3>
                  <p className="text-[10px] text-slate-400 mb-4 font-mono">LOG STUDENT SCHOLASTIC / TECHNICAL ACHIEVEMENT AWARD</p>
                  
                  <form onSubmit={handleAddNewAchievementSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-[#22c55e]">Achievement / Honor Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dean's List Award (Sem 5)"
                        value={newAchTitle}
                        onChange={(e) => setNewAchTitle(e.target.value)}
                        className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-[#22c55e]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-[#22c55e]">Category Group</label>
                        <select
                          value={newAchCat}
                          onChange={(e) => setNewAchCat(e.target.value as Achievement["category"])}
                          className="border-2 border-white bg-[#020e06] px-2 py-2 text-xs text-white outline-none"
                        >
                          <option value="Technical Competition">Technical Competition</option>
                          <option value="Paper Presentation">Paper Presentation</option>
                          <option value="Research Publication">Research Publication</option>
                          <option value="Cultural">Cultural</option>
                          <option value="Sports">Sports</option>
                          <option value="Leadership">Leadership</option>
                          <option value="Award">Award / Honor</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-bold text-[#22c55e]">Issued Organization</label>
                        <input
                          type="text"
                          placeholder="e.g. Stanford University"
                          value={newAchOrg}
                          onChange={(e) => setNewAchOrg(e.target.value)}
                          className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] uppercase font-bold text-[#22c55e]">Brief Description Of Victory</label>
                      <textarea
                        rows={3}
                        placeholder="Detail the criterion, competition scope, or publication indexing..."
                        value={newAchDesc}
                        onChange={(e) => setNewAchDesc(e.target.value)}
                        className="border-2 border-white bg-[#020e06] px-3 py-2 text-xs text-white placeholder-slate-600 outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full border-2 border-white bg-[#22c55e] hover:bg-emerald-450 py-2.5 text-xs font-black text-black uppercase cursor-pointer transition-transform hover:translate-y-[-1px]"
                    >
                      Confirm and Sync Achievement Ledger
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "Coding Profiles" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Github detail block */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-white" />
                  <span className="text-sm font-bold text-white">GitHub profile records</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-450 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">✓ Synced</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center my-4">
                <div className="bg-white/2 p-3 rounded-lg border border-white-5 border-white/5">
                  <p className="text-2xs text-slate-500 font-mono">Repositories</p>
                  <p className="text-lg font-black text-white">18</p>
                </div>
                <div className="bg-white/2 p-3 rounded-lg border border-white-5 border-white/5">
                  <p className="text-2xs text-slate-500 font-mono">Stars</p>
                  <p className="text-lg font-black text-white">420</p>
                </div>
                <td className="bg-white/2 p-3 rounded-lg border border-white-5 border-white/5 table-cell text-center">
                  <p className="text-2xs text-slate-500 font-mono">Forks</p>
                  <p className="text-lg font-black text-white">54</p>
                </td>
              </div>

              <p className="text-xs text-slate-400 leading-normal">
                Verifying commit history. Integrated contribution ledger maps over 142 valid open source commits this year.
              </p>
            </div>

            {/* Leetcode detail */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-bold text-white">LeetCode statistics</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-450 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">✓ Synced</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center my-4 animate-fadeIn">
                <div className="bg-white/2 p-3 rounded-lg border border-white-5 border-white/5">
                  <p className="text-xs text-slate-500 font-mono">Solves count</p>
                  <p className="text-lg font-black text-white">412</p>
                </div>
                <div className="bg-white/2 p-3 rounded-lg border border-white-5 border-white/5">
                  <p className="text-xs text-slate-500 font-mono">Contest Rating</p>
                  <p className="text-lg font-black text-white">1,894</p>
                </div>
                <div className="bg-white/2 p-3 rounded-lg border border-white-5 border-white/5">
                  <p className="text-xs text-slate-500 font-mono">Acceptance</p>
                  <p className="text-lg font-black text-white">64.2%</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-normal">
                Solve distribution: Easy: 140 | Medium: 220 | Hard: 52 solves validated.
              </p>
            </div>

          </div>
        )}

        {/* Competitions */}
        {activeTab === "Competitions" && (
          <div className="rounded-2xl border border-[#22c55e]/20 bg-[#020e06] p-12 text-center flex flex-col items-center gap-3">
            <Trophy className="h-12 w-12 text-slate-600 animate-pulse" />
            <h3 className="text-sm font-semibold text-white">Continuous evaluation codes</h3>
            <p className="text-xs text-slate-500 p-2 leading-relaxed">
              University competition modules catalog and elite hacker ranks list will be synced on next regional coordinator board deployment. This satisfies standard academic criteria.
            </p>
          </div>
        )}
      </div>
    );
  };

  // --- RENDERING ROUTE CONTROLLER ---

  return (
    <div className="min-h-screen font-mono bg-[#020f08] bg-brutalist-grid text-white select-none">
      
      {/* TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b-2 border-white bg-[#020e06] py-3.5 px-6 flex items-center justify-between">
        
        {/* Left branding */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("Dashboard")}>
          <div className="flex h-9 w-9 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-black text-sm shadow-[2px_2px_0px_#ffffff]">
            T
          </div>
          <span className="text-sm font-black uppercase tracking-tighter text-white hidden sm:block">
            Talent<span className="text-[#22c55e]">Sphere</span>
          </span>
        </div>

        {/* Center: Interactive Global Search Bar */}
        <div className="relative w-full max-w-sm mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search students, skills, projects, hackathons..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(!!e.target.value);
              }}
              onFocus={() => {
                if (searchQuery) setShowSearchDropdown(true);
              }}
              className="w-full border-2 border-white bg-black pl-9 pr-4 py-2 text-xs text-white placeholder-slate-650 outline-none focus:border-[#22c55e]"
            />
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-11 left-0 right-0 z-50 border-2 border-white bg-black p-4 neo-shadow-white flex flex-col gap-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-white-30 border-white/30 text-[9px] text-[#22c55e] uppercase tracking-widest font-mono">
                <span>[ NODE REGISTRY RESULTS ]</span>
                <button onClick={() => setShowSearchDropdown(false)} className="hover:text-white font-black cursor-pointer">[ CLOSE X ]</button>
              </div>

              {searchResults.length === 0 ? (
                <p className="text-[10px] text-slate-400 italic p-1">NO MATCHING NODES DETECTED. TRY 'Neuro' OR 'React'</p>
              ) : (
                searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab(item.tab as TabType);
                      setSearchQuery("");
                      setShowSearchDropdown(false);
                    }}
                    className="w-full text-left p-2 border border-white bg-black hover:bg-[#031d0f] transition-all flex items-center justify-between cursor-pointer font-mono"
                  >
                    <div>
                      <span className="text-[9px] font-black uppercase bg-white text-black px-1.5 py-0.5 mr-2">
                        {item.category}
                      </span>
                      <span className="text-2xs text-slate-200 font-bold">{item.text}</span>
                    </div>
                    <span className="text-[9px] font-black text-[#22c55e]">[ GOTO ]</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          
          {/* Adaptive Quick Add / Admin Action button */}
          {(() => {
            let buttonLabel = "[ ADD PROJECT ]";
            let buttonAction = () => setIsAddProjectOpen(true);

            switch (activeTab) {
              case "Dashboard":
                buttonLabel = "[ ADD PROJECT ]";
                buttonAction = () => setIsAddProjectOpen(true);
                break;
              case "My Profile":
                buttonLabel = "[ EDIT PROFILE ]";
                buttonAction = () => setIsEditProfileOpen(true);
                break;
              case "Projects":
                buttonLabel = "[ ADD PROJECT ]";
                buttonAction = () => setIsAddProjectOpen(true);
                break;
              case "Skills":
                buttonLabel = "[ UPDATE SKILLS ]";
                buttonAction = () => setIsEditProfileOpen(true);
                break;
              case "Achievements":
                buttonLabel = "[ ADD ACHIEVEMENT ]";
                buttonAction = () => setIsAddAchievementOpen(true);
                break;
              case "Hackathons":
                buttonLabel = "[ ADD HACKATHON ]";
                buttonAction = () => setIsAddHackathonOpen(true);
                break;
              case "Internships":
                buttonLabel = "[ ADD INTERNSHIP ]";
                buttonAction = () => setIsAddInternshipOpen(true);
                break;
              case "Certifications":
                buttonLabel = "[ ADD CERT ]";
                buttonAction = () => setIsAddCertificateOpen(true);
                break;
              case "Coding Profiles":
                buttonLabel = "[ LINK ACCOUNTS ]";
                buttonAction = () => setIsEditProfileOpen(true);
                break;
              case "Academic Records":
                buttonLabel = "[ AUDIT GPA RECORD ]";
                buttonAction = () => alert("Initiating verified GPA ledger cryptographic audit... Verified logs synced.");
                break;
              case "Documents":
                buttonLabel = "[ UPLOAD DOCUMENT ]";
                buttonAction = () => setIsAddDocOpen(true);
                break;
              case "Analytics":
                buttonLabel = "[ RE-COMPUTE SCORING ]";
                buttonAction = () => alert("Re-computing talent spectrum metrics... scores successfully synchronized.");
                break;
              case "Leaderboard":
                buttonLabel = "[ RE-ALIGN RANKS ]";
                buttonAction = () => alert("Syncing with regional university coordinator board... Ledger alignment completed.");
                break;
              case "Settings":
                buttonLabel = "[ FORCE DATA RESET ]";
                buttonAction = () => {
                  if (window.confirm("System Warning: Reset all stored scholastic data? All manual additions will be cleared.")) {
                    localStorage.clear();
                    window.location.reload();
                  }
                };
                break;
              default:
                buttonLabel = "[ ADD DATA ]";
                buttonAction = () => alert(`Adding action for ${activeTab} category.`);
            }

            return (
              <button
                onClick={buttonAction}
                className="hidden md:flex items-center gap-1.5 border-2 border-white bg-[#22c55e] text-black hover:bg-emerald-450 px-3 py-1.5 text-2xs font-extrabold cursor-pointer uppercase transition-transform hover:translate-y-[-1px]"
              >
                <Plus className="h-3.5 w-3.5" /> {buttonLabel}
              </button>
            );
          })()}

          {/* Messages simulated button */}
          <div className="relative">
            <button
              onClick={() => {
                setMessageOpen(!messageOpen);
                setNotificationOpen(false);
              }}
              className="p-1.5 border-2 border-white bg-black text-slate-350 hover:text-[#22c55e] cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
            {messageOpen && (
              <div className="absolute right-0 top-11 z-50 w-80 border-2 border-white bg-black p-4 neo-shadow-white text-left font-mono">
                <h4 className="text-[10px] font-black text-white uppercase mb-2">[ RECRUITER TRANSMISSIONS ]</h4>
                <div className="space-y-3">
                  {messagesMock.map((m) => (
                    <div key={m.id} className="flex gap-2.5 items-start border-b border-white/10 pb-2 last:border-0 last:pb-0">
                      <img src={m.avatar} className="h-7 w-7 border border-white object-cover shrink-0" alt="Sender" />
                      <div>
                        <p className="text-[10px] font-black text-[#22c55e] uppercase">{m.sender}</p>
                        <p className="text-[9px] text-slate-400 leading-tight">{m.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notification dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setMessageOpen(false);
              }}
              className="p-1.5 border-2 border-white bg-black text-slate-355 hover:text-[#22c55e] cursor-pointer"
            >
              <Bell className="h-4 w-4" />
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-11 z-50 w-80 border-2 border-white bg-black p-4 neo-shadow-white text-left font-mono">
                <h4 className="text-[10px] font-black text-white uppercase mb-3">[ LEDGER STATS / ALERTS ]</h4>
                <div className="space-y-3">
                  {notificationsMock.map((n) => (
                    <div key={n.id} className="border-b border-white/20 pb-2.5 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center text-[#22c55e] text-[9px] font-black">
                        <span className="uppercase">{n.title}</span>
                        <span className="text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[9.5px] text-slate-300 mt-1">{n.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Global signout button */}
          <button
            onClick={onLogout}
            className="text-2xs font-bold text-[#e11d48] hover:underline cursor-pointer border border-[#e11d48] px-2 py-1 uppercase"
          >
            [ LOGOUT ]
          </button>

        </div>
      </header>

      {/* BODY COLUMN: Sidebar Left + dynamic content panel Right */}
      <div className="pt-20 flex min-h-screen">
        
        {/* SIDEBAR NAVIGATION COLUMN */}
        <aside className="w-64 border-r-2 border-white bg-[#020e06] shrink-0 hidden lg:flex flex-col justify-between p-4 fixed top-18 bottom-0 overflow-y-auto">
          
          <div className="space-y-1.5">
            <span className="px-3 text-[9px] uppercase tracking-widest font-black text-slate-410 block mb-2 text-slate-450">[ LEDGER CORE MODULES ]</span>
            
            <button
              onClick={() => setActiveTab("Dashboard")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Dashboard" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              <span>DASHBOARD HOME</span>
            </button>

            <button
              onClick={() => setActiveTab("My Profile")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "My Profile" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <User className="h-4 w-4 shrink-0" />
              <span>MY PROFILE PAGE</span>
            </button>

            <button
              onClick={() => setActiveTab("Projects")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Projects" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <FolderCode className="h-4 w-4 shrink-0" />
              <span>PROJECTS INDEX</span>
            </button>

            <button
              onClick={() => setActiveTab("Skills")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Skills" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>SKILLS MATRIX</span>
            </button>

            <button
              onClick={() => setActiveTab("Achievements")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Achievements" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <Award className="h-4 w-4 shrink-0" />
              <span>ACHIEVEMENTS</span>
            </button>

            <button
              onClick={() => setActiveTab("Hackathons")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Hackathons" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <Trophy className="h-4 w-4 shrink-0" />
              <span>HACKATHON DECK</span>
            </button>

            <button
              onClick={() => setActiveTab("Competitions")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Competitions" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <Activity className="h-4 w-4 shrink-0" />
              <span>COMPETITIONS LIST</span>
            </button>

            <button
              onClick={() => setActiveTab("Internships")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Internships" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <Briefcase className="h-4 w-4 shrink-0" />
              <span>INTERNSHIP MAPS</span>
            </button>

            <button
              onClick={() => setActiveTab("Certifications")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Certifications" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <Award className="h-4 w-4 shrink-0" />
              <span>CERT Vault</span>
            </button>

            <button
              onClick={() => setActiveTab("Coding Profiles")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Coding Profiles" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <Code2 className="h-4 w-4 shrink-0" />
              <span>CODING PROFILES</span>
            </button>

            <button
              onClick={() => setActiveTab("Academic Records")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Academic Records" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span>ACADEMIC RECORDS</span>
            </button>

            <button
              onClick={() => setActiveTab("Documents")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Documents" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span>SECURE DOCUMENTS</span>
            </button>

            <button
              onClick={() => setActiveTab("Analytics")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Analytics" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <TrendingUp className="h-4 w-4 shrink-0" />
              <span>GROWTH ANALYTICS</span>
            </button>

            <button
              onClick={() => setActiveTab("Leaderboard")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Leaderboard" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <ListOrdered className="h-4 w-4 shrink-0" />
              <span>LEADERBOARD RANK</span>
            </button>

            <button
              onClick={() => setActiveTab("Settings")}
              className={`w-full text-left px-3 py-2 text-xs font-black uppercase flex items-center gap-3 transition-colors ${
                activeTab === "Settings" ? "border-2 border-white bg-[#22c55e] text-black shadow-[2px_2px_0px_#ffffff]" : "text-slate-300 hover:text-white hover:bg-black/50 border border-transparent"
              }`}
            >
              <SettingsIcon className="h-4 w-4 shrink-0" />
              <span>SYSTEM SETTINGS</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/20 font-mono text-[9px] text-[#22c55e] uppercase">
            SECURE INTEGRITY NODE // APPROVED
          </div>
        </aside>

        {/* MOBILE BOTTOM NAVIGATION ACCENT LINE */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t-2 border-white bg-[#020e06] p-2.5 flex justify-around items-center text-slate-400 text-2xs font-semibold font-mono">
          <button onClick={() => setActiveTab("Dashboard")} className={`flex flex-col items-center gap-0.5 ${activeTab === "Dashboard" ? "text-[#22c55e]" : ""}`}>
            <LayoutDashboard className="h-4 w-4" />
            <span>DASH</span>
          </button>
          <button onClick={() => setActiveTab("My Profile")} className={`flex flex-col items-center gap-0.5 ${activeTab === "My Profile" ? "text-[#22c55e]" : ""}`}>
            <User className="h-4 w-4" />
            <span>PROFILE</span>
          </button>
          <button onClick={() => setActiveTab("Projects")} className={`flex flex-col items-center gap-0.5 ${activeTab === "Projects" ? "text-[#22c55e]" : ""}`}>
            <FolderCode className="h-4 w-4" />
            <span>PROJECTS</span>
          </button>
          <button onClick={() => setActiveTab("Leaderboard")} className={`flex flex-col items-center gap-0.5 ${activeTab === "Leaderboard" ? "text-[#22c55e]" : ""}`}>
            <ListOrdered className="h-4 w-4" />
            <span>RANKS</span>
          </button>
        </div>

        {/* COMPONENT OUTLET AREA */}
        <main className="flex-1 lg:ml-64 p-6 md:p-10 pb-20 overflow-y-auto">
          {activeTab === "Dashboard" && renderDashboardHome()}
          {activeTab === "My Profile" && renderMyProfile()}
          {activeTab === "Projects" && renderProjects()}
          {activeTab === "Skills" && renderSkills()}
          {activeTab === "Internships" && renderInternships()}
          {activeTab === "Certifications" && renderCertifications()}
          {activeTab === "Hackathons" && renderHackathons()}
          {activeTab === "Academic Records" && renderAcademicRecords()}
          {activeTab === "Documents" && renderDocuments()}
          {activeTab === "Leaderboard" && renderLeaderboard()}
          {activeTab === "Analytics" && renderAnalytics()}
          {activeTab === "Settings" && renderSettings()}
          
          {/* Fallback rendering for supplementary tabs */}
          {["Achievements", "Coding Profiles", "Competitions"].includes(activeTab) && renderOtherTabs()}
        </main>

      </div>

    </div>
  );
}
