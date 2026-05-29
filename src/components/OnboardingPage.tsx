import React, { useState, useRef } from "react";
import { User, GraduationCap, Calendar, FileText, Check, Plus, Search, Trash2, Github, Linkedin, Terminal, HelpCircle, ShieldCheck, ArrowRight, Upload, Sparkles } from "lucide-react";

interface OnboardingPageProps {
  initialData: {
    fullName: string;
    email: string;
    department: string;
    yearOfStudy: string;
  };
  onComplete: (profileData: any) => void;
}

export default function OnboardingPage({ initialData, onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState(1); // Steps 1, 2, 3, and 4 (Preview)

  // STEP 1 State: Personal Information
  const [fullName, setFullName] = useState(initialData.fullName || "Alex Mercer");
  const [department, setDepartment] = useState(initialData.department || "Computer Science & Engineering");
  const [yearOfStudy, setYearOfStudy] = useState(initialData.yearOfStudy || "3rd Year");
  const [rollNumber, setRollNumber] = useState("CSE-2023-084");
  const [bio, setBio] = useState("Passionate Full Stack Developer & AI builder. Active in collegiate open-source and algorithm modules.");
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl);
  const [isDragOver, setIsDragOver] = useState(false);

  // STEP 2 State: Skills & Expertise
  const [skills, setSkills] = useState<string[]>([
    "React", "TypeScript", "Python", "Machine Learning", "Node.js"
  ]);
  const [skillSearch, setSkillSearch] = useState("");
  const suggestedSkills = [
    "Django", "Rust", "Docker", "UI/UX", "DevOps", "Public Speaking", "Cybersecurity", "PostgreSQL",
    "Tailwind CSS", "Next.js", "AWS", "gRPC", "Kubernetes", "Data Structures"
  ];

  // STEP 3 State: Connect Profiles
  const [githubUrl, setGithubUrl] = useState("https://github.com/alexmercer-dev");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/alex-mercer");
  const [leetcodeUrl, setLeetcodeUrl] = useState("https://leetcode.com/alex_mercer");
  const [hackerrankUrl, setHackerrankUrl] = useState("https://hackerrank.com/mercer_codes");
  const [skillrackUrl, setSkillrackUrl] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Math calculated completion percentage
  const getProgressPercentage = () => {
    if (step === 1) return 35;
    if (step === 2) return 65;
    if (step === 3) return 90;
    return 100;
  };

  // Avatar drag & drop / manual select
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  // Skill Add / Delete handlers
  const handleAddSkill = (skill: string) => {
    const sanitized = skill.trim();
    if (sanitized && !skills.includes(sanitized)) {
      setSkills([...skills, sanitized]);
    }
    setSkillSearch("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Validation before changing step
  const handleContinueStep = () => {
    if (step === 1) {
      if (!fullName.trim()) return;
      if (!rollNumber.trim()) return;
      setStep(2);
    } else if (step === 2) {
      if (skills.length === 0) return;
      setStep(3);
    } else if (step === 3) {
      setStep(4); // Final Preview Section
    }
  };

  const handleFinalSuccessSubmit = () => {
    onComplete({
      fullName,
      email: initialData.email,
      department,
      yearOfStudy,
      rollNumber,
      bio,
      avatar: avatarPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      skills,
      connectedProfiles: {
        github: githubUrl,
        linkedin: linkedinUrl,
        leetcode: leetcodeUrl,
        hackerrank: hackerrankUrl,
        skillrack: skillrackUrl,
      }
    });
  };

  // Filter local choices
  const filteredSuggestions = suggestedSkills.filter(
    (s) =>
      s.toLowerCase().includes(skillSearch.toLowerCase()) &&
      !skills.includes(s)
  );

  return (
    <div className="min-h-screen text-slate-200 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#020f08] bg-brutalist-grid font-mono relative">
      
      {/* Top Center Progress Indicator */}
      <div className="absolute top-6 left-0 right-0 z-30 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm flex items-center justify-between text-[10px] uppercase font-black text-slate-400 mb-2">
          <span>Profile Compilation</span>
          <span className="text-[#22c55e]">{getProgressPercentage()}%</span>
        </div>
        
        {/* Dynamic Micro Progress bar */}
        <div className="w-full max-w-sm h-4 border-2 border-white bg-black overflow-hidden relative">
          <div
            className="h-full bg-[#22c55e] border-r-2 border-white transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {step < 4 && (
          <span className="text-[9px] text-[#22c55e] mt-1 uppercase font-black tracking-wider">
            COMPILE NODE STATUS: STEP {step} OF 3
          </span>
        )}
      </div>

      {/* LEFT PANEL: Branding & floating badges */}
      <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[#031c0e] border-r-2 border-white mt-16 lg:mt-0">
        
        {/* Top watermark logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-black text-xs">
            TS
          </div>
          <span className="text-xs font-black tracking-widest text-[#22c55e] uppercase">[ ONBOARDING PROTOCOL ]</span>
        </div>

        {/* Dynamic floating feedback area */}
        <div className="max-w-xs my-auto">
          <h2 className="text-3xl font-black text-white leading-none uppercase tracking-tighter">
            PROFILER UNIT
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed mt-4">
            Initialize your profile matrix to calculate scholastic metrics, project status, and professional placement scores.
          </p>

          <div className="flex flex-col gap-3 mt-8 select-none">
            
            <div className="flex items-center gap-2.5 border-2 border-white bg-black p-3 hover:translate-x-1 transition-all duration-200">
              <span className="text-sm">🏆</span>
              <div>
                <p className="text-[10px] font-black text-white uppercase">HACKATHON WINNER STATUS</p>
                <p className="text-[9px] text-[#22c55e] uppercase">Active prototype scoring</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-2 border-white bg-black p-3 hover:translate-x-1 transition-all duration-200">
              <span className="text-sm">💻</span>
              <div>
                <p className="text-[10px] font-black text-white uppercase">REPOSITORIES SYNCED</p>
                <p className="text-[9px] text-slate-400 uppercase">Automated code inspection</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 border-2 border-white bg-black p-3 hover:translate-x-1 transition-all duration-200">
              <span className="text-sm">🚀</span>
              <div>
                <p className="text-[10px] font-black text-white uppercase">OPEN SOURCE RATINGS</p>
                <p className="text-[9px] text-[#22c55e] uppercase">Digital branch verification</p>
              </div>
            </div>

          </div>
        </div>

        <span className="text-2xs text-slate-500 font-mono">
          TS_DIGITAL_IDENTITY_V1 // ONBOARD
        </span>
      </div>

      {/* RIGHT PANEL: Dynamic stepper forms */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-12 mt-16">
        <div className="w-full max-w-[520px] border-2 border-white bg-black p-8 neo-shadow-white relative z-10">
          
          {/* STEP 1: Basic Personal Info */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">[ 1/3: CORE DETAILS ]</h3>
                <p className="text-xs text-slate-450 mt-1 uppercase text-[#22c55e]">
                  Introduce your coordinates to the regional university ledger.
                </p>
              </div>

              {/* Profile Photo Upload */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ TARGET PHOTO ]</span>
                <div className="flex items-center gap-5">
                  <div className="relative shrink-0">
                    <img
                      src={avatarPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
                      className="h-16 w-16 border-2 border-white object-cover"
                      alt="Preview"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-[#22c55e] border border-white flex items-center justify-center text-[10px]/none p-0">
                      ⚙️
                    </div>
                  </div>
                  
                  {/* Drag drop box */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex-1 border-2 border-dashed p-4 text-center cursor-pointer transition-all duration-200 ${
                      isDragOver
                        ? "border-[#22c55e] bg-[#031c0e]"
                        : "border-white/30 bg-[#020e06] hover:border-white"
                    }`}
                  >
                    <Upload className="h-4 w-4 mx-auto text-[#22c55e] mb-1" />
                    <p className="text-[10px] text-slate-250 font-black uppercase">
                      Drag & drop image here or <span className="text-[#22c55e] underline">browse</span>
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5 uppercase">WEBP / PNG Up to 5MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5 font-mono">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ NOMINAL FULL NAME ]</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Alex Mercer"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border-2 border-white bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-605 outline-none focus:border-[#22c55e]"
                  />
                </div>
              </div>

              {/* Department & Year Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ SECTOR DEPT ]</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Computer Science"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full border-2 border-white bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-605 outline-none focus:border-[#22c55e]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ CARD ID / NUMBER ]</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. CSE-2023-084"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full border-2 border-white bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-605 outline-none focus:border-[#22c55e]"
                    />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ MOTTO BIO MATRIX ]</label>
                  <span className="text-[9px] font-mono text-[#22c55e]">{bio.length}/150</span>
                </div>
                <textarea
                  placeholder="Introduce yourself in 150 characters..."
                  maxLength={150}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className="w-full border-2 border-white bg-black p-3 text-xs text-white placeholder-slate-600 outline-none focus:border-[#22c55e] resize-none"
                />
              </div>

              <button
                onClick={handleContinueStep}
                disabled={!fullName.trim() || !rollNumber.trim()}
                className="mt-2 border-2 border-white bg-[#22c55e] text-black font-black uppercase py-3 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[4px_4px_0px_#ffffff] transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
              >
                COMPILER PRE-VALIDATE() →
              </button>
            </div>
          )}

          {/* STEP 2: Skills Tag Pill Component */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">[ 2/3: EXPERTISE VECTORS ]</h3>
                <p className="text-xs text-[#22c55e] uppercase mt-1">
                  Tag technical components to configure index scores.
                </p>
              </div>

              {/* Tag search inputs */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ MANUALLY ADD SKILLS ]</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rust, Django, React, CUDA"
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (skillSearch.trim()) handleAddSkill(skillSearch);
                        }
                      }}
                      className="w-full border-2 border-white bg-black pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-605 outline-none focus:border-[#22c55e]"
                    />
                  </div>
                  {skillSearch && (
                    <button
                      type="button"
                      onClick={() => handleAddSkill(skillSearch)}
                      className="border-2 border-white bg-[#22c55e] text-black px-4 cursor-pointer font-black"
                    >
                      +
                    </button>
                  )}
                </div>
              </div>

              {/* Active list Suggestions */}
              {skillSearch && filteredSuggestions.length > 0 && (
                <div className="border border-white bg-[#020e06] p-2 max-h-36 overflow-y-auto flex flex-col gap-1.5">
                  {filteredSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAddSkill(s)}
                      className="text-left text-xs px-3 py-1 bg-black border border-white/20 text-slate-300 hover:text-white transition-colors flex items-center justify-between"
                    >
                      <span>{s}</span>
                      <span className="text-[#22c55e] font-bold">+ADD</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Active Skill pill tags list */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ LOADED CORE PROTOCOLS: {skills.length} ]</span>
                <div className="flex flex-wrap gap-2 min-h-16 border-2 border-white bg-[#020e06] p-3">
                  {skills.length === 0 ? (
                    <p className="text-xs text-slate-500 italic uppercase">Vector tag array is currently empty.</p>
                  ) : (
                    skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 border border-white bg-black px-2.5 py-1 text-2xs font-extrabold text-[#22c55e]"
                      >
                        {s}
                        <Trash2
                          className="h-3 w-3 text-red-500 hover:text-red-400 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSkill(s);
                          }}
                        />
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Suggested Skills */}
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">[ SUGGESTED NODES ]</span>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto font-mono text-[10px]">
                  {suggestedSkills
                    .filter((s) => !skills.includes(s))
                    .map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddSkill(s)}
                        className="border border-white/35 bg-black px-2 py-1 text-slate-300 hover:text-black hover:bg-[#22c55e] transition-colors cursor-pointer"
                      >
                        + {s}
                      </button>
                    ))}
                </div>
              </div>

              {/* Proceed buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="border-2 border-white bg-black hover:bg-neutral-900 px-5 text-xs font-black text-slate-305 uppercase cursor-pointer"
                >
                  [ BACK ]
                </button>
                <button
                  onClick={handleContinueStep}
                  disabled={skills.length === 0}
                  className="flex-1 border-2 border-white bg-[#22c55e] text-black font-black uppercase py-3.5 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[4px_4px_0px_#ffffff] transition-all disabled:opacity-40 disabled:pointer-events-none text-center"
                >
                  COMMIT VECTORS STANDINGS() →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Connect External profiles with verification visual checks */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">[ 3/3: EXTERNAL REPOS ]</h3>
                <p className="text-xs text-[#22c55e] uppercase mt-1">
                  Link real accounts. The micro-verifier will inspect connected arrays.
                </p>
              </div>

              {/* Fields column */}
              <div className="flex flex-col gap-3.5 max-h-[300px] overflow-y-auto pr-1">

                {/* Github */}
                <div className="border border-white/60 bg-black p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-white" />
                      <span className="text-xs font-black uppercase text-slate-200">GitHub Profile</span>
                    </div>
                    {githubUrl.includes("github.com/") && (
                      <span className="text-[10px] font-black text-[#22c55e] uppercase">
                        [ ✓ CONNECTED ]
                      </span>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="https://github.com/yourusername"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-[#22c55e]"
                  />
                </div>

                {/* Linkedin */}
                <div className="border border-white/60 bg-black p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-cyan-400" />
                      <span className="text-xs font-black uppercase text-slate-200">LinkedIn url</span>
                    </div>
                    {linkedinUrl.includes("linkedin.com/") && (
                      <span className="text-[10px] font-black text-[#22c55e] uppercase">
                        [ ✓ CONNECTED ]
                      </span>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourusername"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-[#22c55e]"
                  />
                </div>

                {/* Leetcode */}
                <div className="border border-white/60 bg-black p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs font-black uppercase text-slate-200">LeetCode Profile</span>
                    </div>
                    {leetcodeUrl.trim().length > 3 && (
                      <span className="text-[10px] font-black text-[#22c55e] uppercase">
                        [ ✓ CONNECTED ]
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="LeetCode username"
                    value={leetcodeUrl}
                    onChange={(e) => setLeetcodeUrl(e.target.value)}
                    className="w-full border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-[#22c55e]"
                  />
                </div>

                {/* HackerRank */}
                <div className="border border-white/60 bg-black p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#22c55e]">HR</span>
                      <span className="text-xs font-black uppercase text-slate-200">HackerRank Profile</span>
                    </div>
                    {hackerrankUrl.trim().length > 3 && (
                      <span className="text-[10px] font-black text-[#22c55e] uppercase">
                        [ ✓ CONNECTED ]
                      </span>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="https://hackerrank.com/yourusername"
                    value={hackerrankUrl}
                    onChange={(e) => setHackerrankUrl(e.target.value)}
                    className="w-full border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-[#22c55e]"
                  />
                </div>

                {/* SkillRack */}
                <div className="border border-white/60 bg-black p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-cyan-400 font-mono">SR</span>
                      <span className="text-xs font-black uppercase text-slate-200">SkillRack url (Optional)</span>
                    </div>
                    {skillrackUrl.trim().length > 3 && (
                      <span className="text-[10px] font-black text-[#22c55e] uppercase">
                        [ ✓ CONNECTED ]
                      </span>
                    )}
                  </div>
                  <input
                    type="url"
                    placeholder="SkillRack profile URL"
                    value={skillrackUrl}
                    onChange={(e) => setSkillrackUrl(e.target.value)}
                    className="w-full border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-[#22c55e]"
                  />
                </div>

              </div>

              {/* Proceed buttons */}
              <div className="flex gap-4 pt-1">
                <button
                  onClick={() => setStep(2)}
                  className="border-2 border-white bg-black hover:bg-neutral-900 px-5 text-xs font-black text-slate-350 uppercase cursor-pointer"
                >
                  [ BACK ]
                </button>
                <button
                  onClick={handleContinueStep}
                  className="flex-1 border-2 border-white bg-[#22c55e] text-black font-black uppercase py-3.5 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[4px_4px_0px_#ffffff] transition-all text-center cursor-pointer"
                >
                  RESOLVE CARD BLUEPRINT() →
                </button>
              </div>
            </div>
          )}

          {/* FINAL SECTION (Step 4): Professional Digital Identity Preview Card */}
          {step === 4 && (
            <div className="flex flex-col gap-6 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Terminal className="h-7 w-7 text-[#22c55e] animate-bounce" />
                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                  YOUR CARD PROPOSAL IS ACTIVE
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  All verified nodes aligned. View compiled static blueprint outcome.
                </p>
              </div>

              {/* Premium Preview ID Card layout */}
              <div className="border-2 border-white bg-[#031d0f] p-6 text-left relative overflow-hidden neo-shadow-white">
                
                {/* ID badge header */}
                <div className="flex items-center justify-between border-b-2 border-white pb-4 mb-4 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-[#22c55e]">VERIFIED TALENT GRID SYSTEM</span>
                  </div>
                  <span className="text-[9px] border border-white bg-black px-1.5 text-white font-mono">[ COHORT MEMBER ]</span>
                </div>

                {/* Profile detail section */}
                <div className="flex items-center gap-4 font-mono">
                  <img
                    src={avatarPreview || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
                    className="h-16 w-16 border-2 border-white object-cover shrink-0"
                    alt={fullName}
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-base font-black text-white uppercase tracking-tight">{fullName}</h4>
                    <p className="text-[10px] text-slate-400">REG ID: {rollNumber}</p>
                    <p className="text-[10px] font-black text-[#22c55e] mt-1">{department}</p>
                    <p className="text-[9px] text-slate-350">{yearOfStudy} STANDING</p>
                  </div>
                </div>

                {/* Bio text */}
                <p className="mt-4 text-xs text-slate-200 leading-relaxed bg-[#020e06] border-2 border-white p-3 font-mono">
                  &ldquo;{bio || "Student coder at TalentSphere."}&rdquo;
                </p>

                {/* Skills Preview */}
                <div className="mt-4 space-y-1.5 font-mono">
                  <span className="text-[9px] text-[#22c55e] font-bold uppercase tracking-wider">[ STATIC VECTORS LOADED ]</span>
                  <div className="flex flex-wrap gap-1">
                    {skills.slice(0, 5).map((s, idx) => (
                      <span key={idx} className="border border-white bg-black px-2 py-0.5 text-[9px] text-[#22c55e]">
                        {s}
                      </span>
                    ))}
                    {skills.length > 5 && (
                      <span className="border border-white/40 bg-black px-2 py-0.5 text-[9px] text-slate-400">
                        +{skills.length - 5} MORE
                      </span>
                    )}
                  </div>
                </div>

                {/* Connected nodes */}
                <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between font-mono">
                  <span className="text-[9px] text-slate-400 uppercase">INDEX RATING Standings:</span>
                  <div className="text-[10px] font-bold text-black bg-[#22c55e] border border-white px-2 py-0.5 uppercase">
                    TALENT INDEX: 92% SECURE
                  </div>
                </div>
              </div>

              {/* final button */}
              <button
                onClick={handleFinalSuccessSubmit}
                className="border-2 border-white bg-[#22c55e] text-black font-black uppercase py-4 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[5px_5px_0px_#ffffff] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                COMPILE MODULES & LAUNCH DASHBOARD <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
