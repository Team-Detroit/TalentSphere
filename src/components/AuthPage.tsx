import React, { useState } from "react";
import { Mail, Lock, User, GraduationCap, Calendar, Eye, EyeOff, ArrowLeft, Github, Linkedin, Chrome } from "lucide-react";

interface AuthPageProps {
  initialIsSignUp?: boolean;
  onBack: () => void;
  onAuthSuccess: (formData: { fullName: string; email: string; department?: string; yearOfStudy?: string }) => void;
}

export default function AuthPage({ initialIsSignUp = false, onBack, onAuthSuccess }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [yearOfStudy, setYearOfStudy] = useState("3rd Year");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email) {
      setErrorMsg("COLLEGE EMAIL PORT IS REQUIRED.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMsg("INVALID COLLEGE DOMAIN PORT DETECTED.");
      return;
    }

    if (isSignUp) {
      if (!fullName) {
        setErrorMsg("FULL NAME RECORD IS EMPTY.");
        return;
      }
      if (password.length < 6) {
        setErrorMsg("PASSCODE PROTOCOL MUST BE >= 6 CHARS.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("VERIFICATION CODES MISMATCH DETECTED.");
        return;
      }
    } else {
      if (password.length < 4) {
        setErrorMsg("ACCESS REJECTED. CHECK PASSCODE.");
        return;
      }
    }

    onAuthSuccess({
      fullName: isSignUp ? fullName : "Alex Mercer",
      email,
      department: isSignUp ? department : "Computer Science & Engineering",
      yearOfStudy: isSignUp ? yearOfStudy : "3rd Year"
    });
  };

  const handleOAuthClick = (platform: string) => {
    onAuthSuccess({
      fullName: "Alex Mercer",
      email: "alex.mercer@university.edu",
      department: "Computer Science & Engineering",
      yearOfStudy: "3rd Year"
    });
  };

  const departmentsList = [
    "Computer Science & Engineering",
    "Information Technology",
    "Artificial Intelligence & Data Science",
    "Electronics & Communication",
    "Electrical & Electronics",
    "Mechanical Engineering"
  ];

  const collegeYears = [
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Postgraduate"
  ];

  return (
    <div className="min-h-screen text-slate-200 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-[#020f08] bg-brutalist-grid font-mono relative">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 border-2 border-white bg-[#031d0f] hover:bg-[#22c55e] hover:text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0px_#ffffff] px-4 py-2 text-xs font-black text-white uppercase transition-all cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> [ SYSTEM_BACK ]
      </button>

      {/* LEFT SIDE: Large Branding Area */}
      <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-12 overflow-hidden bg-[#031c0e] border-r-2 border-white">
        
        {/* Top Header */}
        <div className="flex items-center gap-2.5 mt-16">
          <div className="flex h-10 w-10 items-center justify-center border-2 border-white bg-[#22c55e] text-lg font-black text-black shadow-[3px_3px_0px_#ffffff]">
            TS
          </div>
          <span className="text-xl font-black uppercase text-white tracking-tighter">
            TalentSphere
          </span>
        </div>

        {/* Centered Pitch */}
        <div className="flex flex-col gap-6 max-w-sm my-auto">
          <div className="border border-[#22c55e] inline-block bg-black px-2 py-1 text-[10px] text-[#22c55e] tracking-widest font-bold self-start">
            [ ID_GENERATOR_V1 ]
          </div>
          <h2 className="text-3xl font-black text-white leading-none uppercase tracking-tighter">
            SCHOLASTIC<br />INTELLIGENCE<br />INDEX
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            Build your high-contrast digital identity profile, securely bound to active code metrics, credentials, and college matrices.
          </p>

          {/* Simulated badges list */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-3 border-2 border-white bg-black p-3.5 neo-shadow-green">
              <span className="text-lg">🏆</span>
              <div>
                <p className="text-[11px] font-black uppercase text-white">Hackathon Winner Badge</p>
                <p className="text-[10px] text-[#22c55e] uppercase">Verified at CalHacks 11.0</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-2 border-white bg-black p-3.5 neo-shadow-white">
              <span className="text-lg">💻</span>
              <div>
                <p className="text-[11px] font-black uppercase text-white">Full Stack Dev status</p>
                <p className="text-[10px] text-slate-300 uppercase">4 industrial repos verified</p>
              </div>
            </div>

            <div className="flex items-center gap-3 border-2 border-white bg-black p-3.5 neo-shadow-green">
              <span className="text-lg">📈</span>
              <div>
                <p className="text-[11px] font-black uppercase text-white">CGPA 9.42 / Top 2%</p>
                <p className="text-[10px] text-[#22c55e] uppercase">Active Department Transcript</p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom watermark */}
        <span className="text-2xs text-slate-500 font-mono">
          SYSTEM_PORT_INBOUND_VERIFIED // P2P_SECURE_NODE
        </span>
      </div>

      {/* RIGHT SIDE: Authentication Card Form */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-[460px] border-2 border-white bg-black p-8 neo-shadow-white relative z-10">
          
          {/* Form Header */}
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">
              {isSignUp ? "INITIALIZE PROTOCOL" : "WELCOME TERMINAL"}
            </h3>
            <p className="text-xs text-slate-400 capitalize">
              {isSignUp ? "Introduce your scholastic details to begin" : "Connect with your university registry"}
            </p>
          </div>

          {/* Toggle Tab header */}
          <div className="grid grid-cols-2 bg-[#020f08] p-1.5 mb-6 border-2 border-white">
            <button
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg("");
              }}
              className={`py-2 text-xs font-black uppercase tracking-wider cursor-pointer ${
                !isSignUp ? "bg-[#22c55e] text-black border border-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg("");
              }}
              className={`py-2 text-xs font-black uppercase tracking-wider cursor-pointer ${
                isSignUp ? "bg-[#22c55e] text-black border border-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error messages */}
          {errorMsg && (
            <div className="mb-4 border-2 border-red-500 bg-red-950/20 px-4 py-2.5 text-xs text-red-400 font-mono uppercase tracking-tight">
              ⚠️ ERROR: {errorMsg}
            </div>
          )}

          {/* Core Form Area */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            
            {isSignUp && (
              <>
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ USER FULL NAME ]</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Alex Mercer"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border-2 border-white bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none focus:border-[#22c55e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ CODE DEPT ]</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full border-2 border-white bg-black pl-10 pr-3 py-2.5 text-xs text-slate-200 outline-none focus:border-[#22c55e] appearance-none"
                      >
                        {departmentsList.map((dept, i) => (
                          <option key={i} value={dept} className="bg-black text-white">{dept}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Year of study */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ COHORT YEAR ]</label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <select
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                        className="w-full border-2 border-white bg-black pl-10 pr-3 py-2.5 text-xs text-slate-200 outline-none focus:border-[#22c55e] appearance-none"
                      >
                        {collegeYears.map((year, i) => (
                          <option key={i} value={year} className="bg-black text-white">{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ COLLEGE EMAIL ADDRESS ]</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="e.g. alex.mercer@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-white bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-605 outline-none focus:border-[#22c55e]"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ MATRIX PASSCODE ]</label>
                {!isSignUp && (
                  <span className="text-[9px] text-[#22c55e] hover:underline cursor-pointer">
                    RESET_PASS()
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignUp ? "Create dynamic passcode" : "Enter account passcode"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-white bg-black pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-650 outline-none focus:border-[#22c55e]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">[ CONFIRM MATRIX PASSCODE ]</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Verify passcode compatibility"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-2 border-white bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-650 outline-none focus:border-[#22c55e]"
                  />
                </div>
              </div>
            )}

            {/* Remember me */}
            {!isSignUp && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="border-2 border-white bg-black text-[#22c55e] focus:ring-0 focus:ring-offset-0 h-4 w-4"
                />
                <label htmlFor="remember" className="text-[10px] text-slate-400 uppercase tracking-tight cursor-pointer select-none">
                  REMEMBER COMPILER CACHE SESSION
                </label>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="mt-3 border-2 border-white bg-[#22c55e] text-black font-black uppercase py-3 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[4px_4px_0px_#ffffff] transition-all cursor-pointer"
            >
              {isSignUp ? "[ EXEC_SEQUENCE: COMPILATION() ]" : "[ EXEC_SEQUENCE: MOUNT_SESSION() ]"}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <span className="relative bg-black text-[9px] text-slate-400 border border-white px-3 py-1 font-black uppercase tracking-widest">
              COLLEGIATE PORTALS
            </span>
          </div>

          {/* Social login grid */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleOAuthClick("google")}
              className="flex items-center justify-center gap-2 border-2 border-white bg-black hover:bg-[#031d0f] py-2.5 text-slate-200 hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:box-shadow-[2px_2px_0px_#ffffff] transition-all cursor-pointer text-2xs uppercase font-black"
            >
              <Chrome className="h-3.5 w-3.5 text-red-500" />
              <span>Google</span>
            </button>
            <button
              onClick={() => handleOAuthClick("github")}
              className="flex items-center justify-center gap-2 border-2 border-white bg-black hover:bg-[#031d0f] py-2.5 text-slate-200 hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:box-shadow-[2px_2px_0px_#ffffff] transition-all cursor-pointer text-2xs uppercase font-black"
            >
              <Github className="h-3.5 w-3.5 text-[#22c55e]" />
              <span>GitHub</span>
            </button>
            <button
              onClick={() => handleOAuthClick("linkedin")}
              className="flex items-center justify-center gap-2 border-2 border-white bg-black hover:bg-[#031d0f] py-2.5 text-slate-200 hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:box-shadow-[2px_2px_0px_#ffffff] transition-all cursor-pointer text-2xs uppercase font-black"
            >
              <Linkedin className="h-3.5 w-3.5 text-cyan-500" />
              <span>LinkedIn</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
