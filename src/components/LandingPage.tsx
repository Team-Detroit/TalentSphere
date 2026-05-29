import { useState, useEffect } from "react";
import { Sparkles, Terminal, Award, Briefcase, ChevronRight, UserCheck, Layers, Cpu, ArrowRight, ShieldCheck, Zap } from "lucide-react";

interface LandingPageProps {
  onNavigateToAuth: (isSignUp?: boolean) => void;
}

export default function LandingPage({ onNavigateToAuth }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white font-mono selection:bg-[#22c55e] selection:text-black">
      
      {/* Sticky Top Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b-2 border-white ${
          scrollY > 40
            ? "bg-[#020f08]/95 backdrop-blur-md py-3 shadow-lg"
            : "bg-[#020f08] py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative flex h-10 w-10 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-black neo-shadow-white text-base">
              T
            </div>
            <span className="text-lg font-black tracking-tight text-white uppercase font-mono">
              Talent<span className="text-black bg-[#22c55e] border border-white ml-1 px-1.5 py-0.5 font-extrabold">Sphere</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 text-2xs font-bold uppercase tracking-wider text-slate-300">
            <a href="#features" className="hover:text-[#22c55e] transition-all hover:bg-white/5 border border-transparent hover:border-white/20 px-2.5 py-1">[ FEATURES ]</a>
            <a href="#how-it-works" className="hover:text-[#22c55e] transition-all hover:bg-white/5 border border-transparent hover:border-white/20 px-2.5 py-1">[ DISCOVERY PROCESS ]</a>
            <p className="text-[#22c55e] font-sans">▪</p>
            <span className="text-slate-400 bg-white/5 border border-white/10 px-2 py-1 text-[10px]">Registry Portal v3.9</span>
          </div>

          {/* Call to action buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigateToAuth(false)}
              className="text-xs font-bold uppercase tracking-wider text-slate-350 hover:text-white transition-colors cursor-pointer px-3 py-1.5 hover:underline"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigateToAuth(true)}
              className="border-2 border-white bg-[#22c55e] text-black font-extrabold uppercase px-4 py-2 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#ffffff] transition-all active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            >
              Try Now →
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-32 pb-20">
        
        {/* Authentic high-contrast CRT line grids */}
        <div className="absolute inset-0 bg-brutalist-grid pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Top Hero Column: Text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6 z-10">
            
            {/* Brutalist Tag Badge */}
            <div className="inline-flex items-center gap-2 border-2 border-white bg-black px-4 py-2 text-xs text-[#22c55e] font-extrabold uppercase tracking-widest neo-shadow-white">
              <Terminal className="h-3.5 w-3.5 text-[#22c55e] animate-pulse" />
              <span>[ REGISTRY ACTIVE_NODE_7 ]</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-none uppercase font-mono">
              EVERY SCHOLASTIC ACCENT.<br />
              EVERY CORE CODE REPO.<br />
              <span className="text-black bg-[#22c55e] border-2 border-white px-3 py-1 mt-2 inline-block font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-widest leading-none neo-shadow-white">
                ONE TRUSTED IDENTITY.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl font-mono">
              TalentSphere establishes your permanent academic footprint. Unify projects, verified grading semestrals, GitHub activity scores, LeetCode medals, and certifications inside an immutable, high-contrast, security-oriented registry built for modern developer recruitment.
            </p>

            {/* BRUTALIST CTAs */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <button
                onClick={() => onNavigateToAuth(true)}
                className="border-2 border-white bg-[#22c55e] text-black font-extrabold uppercase tracking-wider px-8 py-3.5 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#ffffff] transition-all cursor-pointer flex items-center gap-2"
              >
                TRY SYSTEM_ONBOARDING() →
              </button>
              <a
                href="#features"
                className="border-2 border-white bg-black text-white font-extrabold uppercase tracking-wider px-8 py-3.5 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#22c55e] transition-all cursor-pointer"
              >
                [ VIEW CAPABILITIES ]
              </a>
            </div>

            {/* Mini Trust Stats */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-white/20 w-full flex gap-8 items-center">
              <div>
                <p className="text-2xl font-black text-[#22c55e]">CGPA: 9.42 / 10</p>
                <p className="text-[10px] uppercase tracking-widest text-[#81C39A]">PLACEMENT GATEWAY AVERAGE</p>
              </div>
              <div className="h-10 w-[2px] bg-white/25" />
              <div>
                <p className="text-2xl font-black text-white">400K+ RECORDS</p>
                <p className="text-[10px] uppercase tracking-widest text-[#81C39A]">VERIFIED GITHUB COMMITS</p>
              </div>
            </div>
          </div>

          {/* Floating Right Side Preview Dashboard */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Retro Wireframe Backdrop */}
            <div className="absolute inset-x-0 h-80 border-2 border-dashed border-white/15 transform rotate-2" />
            
            {/* Floating Container */}
            <div className="relative w-full max-w-[420px] p-4 flex flex-col gap-4 animate-float">
              
              {/* Primary Profile Card */}
              <div className="border-2 border-white bg-[#092211] p-5 neo-shadow-white relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
                {/* Neon green corner accent header */}
                <div className="absolute top-0 right-0 h-3 w-3 bg-[#22c55e] border-b-2 border-l-2 border-white" />
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80"
                      alt="Student"
                      className="h-14 w-14 border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center bg-[#22c55e] text-black border border-white text-[10px] font-bold" title="Identity Verified">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white hover:text-[#22c55e] font-mono tracking-tight uppercase">Alex Mercer</h3>
                    <p className="text-[10px] text-slate-300 font-mono tracking-widest">[ ROLL: CSE-2023-084 ]</p>
                    <p className="text-[10px] text-[#22c55e] font-black uppercase">B.E. COMPUTER SCIENCE</p>
                  </div>
                </div>

                {/* Score indicators */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-white/10 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="border border-white/20 bg-black/50 p-2">
                    <p className="text-[9px] text-[#81C39A] uppercase tracking-wider font-mono">cgpa</p>
                    <p className="text-xs font-black text-white">9.42 / 10</p>
                  </div>
                  <div className="border border-white/20 bg-black/50 p-2">
                    <p className="text-[9px] text-[#81C39A] uppercase tracking-wider font-mono">talent</p>
                    <p className="text-xs font-black text-[#22c55e]">92%</p>
                  </div>
                  <div className="border border-white/20 bg-[#22c55e] p-2 text-black font-extrabold">
                    <p className="text-[9px] uppercase tracking-wider font-mono">national</p>
                    <p className="text-xs font-black">🏆 3x</p>
                  </div>
                </div>
              </div>

              {/* Connected Profiles Widgets Stacked Offset */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Github stats */}
                <div className="border-2 border-white bg-black p-3 h-24 flex flex-col justify-between hover:border-[#22c55e] transition-all neo-shadow-white">
                  <div className="flex items-center justify-between text-slate-400 text-2xs">
                    <span className="font-bold text-[9px] uppercase tracking-wider">GitHub Hub</span>
                    <span className="text-[#22c55e] text-[9px] font-bold uppercase blink">Active</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">420 STARS</h4>
                    <p className="text-[9px] text-[#81C39A] font-mono">142 verifications</p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 border border-white/10">
                    <div className="h-full bg-[#22c55e]" style={{ width: "82%" }} />
                  </div>
                </div>

                {/* Leetcode stats */}
                <div className="border-2 border-white bg-black p-3 h-24 flex flex-col justify-between hover:border-[#22c55e] transition-all neo-shadow-white">
                  <div className="flex items-center justify-between text-slate-450 text-[9px] font-bold uppercase">
                    <span className="text-slate-350">LeetCode</span>
                    <span className="text-amber-400">Gold</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">400+ SOLVED</h4>
                    <p className="text-[9px] text-[#81C39A] font-mono">TOP 4% GLOBAL</p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 border border-white/10">
                    <div className="h-full bg-white" style={{ width: "91%" }} />
                  </div>
                </div>
              </div>

              {/* Verified credentials tag box */}
              <div className="border-2 border-white bg-[#051b0d] p-4 transition-all hover:bg-[#092211] neo-shadow-green">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-mono font-bold">VERIFIED CERTIFICATES</span>
                  <span className="border border-white bg-[#22c55e] px-1.5 text-[9px] font-black text-black uppercase">[ 4 SECURE ]</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="border border-white/20 bg-black/40 px-2 py-1 text-[9px] text-slate-200">☁️ Google Cloud Architect</span>
                  <span className="border border-white/20 bg-black/40 px-2 py-1 text-[9px] text-slate-200">🤖 TensorFlow Expert</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section id="features" className="py-24 border-t-2 border-b-2 border-white bg-black/40 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="border-2 border-[#22c55e] bg-black text-[#22c55e] px-4 py-1.5 text-xs font-black uppercase tracking-wider font-mono neo-shadow-white">
              [ THE CORE PROTOCOL ]
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tighter font-mono">
              UNIFIED ACADEMIC LEDGER
            </h2>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-mono">
              Consolidate every university credential, repository active metric, and hackathon project. No fake placeholders, only cryptographic student identity scoring.
            </p>
          </div>

          {/* Features Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
            
            {/* Feature 1 */}
            <div className="border-2 border-white bg-[#031c0e] hover:bg-[#082e18] p-8 neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#ffffff] transition-all duration-150 flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-extrabold shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                <Layers className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-black text-white uppercase tracking-tight">University Semestrals</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Display verified course grades, direct semestral matrices, official GPA ratings, and real-time credential verification URLs.
                </p>
                <div className="mt-2 text-[10px] uppercase font-black text-[#22c55e] flex items-center gap-1">
                  SECURE PROTOCOL ACTIVE
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="border-2 border-white bg-[#031c0e] hover:bg-[#082e18] p-8 neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#ffffff] transition-all duration-150 flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-extrabold shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                <Terminal className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-black text-white uppercase tracking-tight">Connected Repositories</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Connect GitHub, LeetCode, HackerRank, and forces scores. Dynamically compute academic talent rating structures directly in-browser.
                </p>
                <div className="mt-2 text-[10px] uppercase font-black text-[#22c55e] flex items-center gap-1">
                  INTEGRATIONS ENGAGED
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="border-2 border-white bg-[#031c0e] hover:bg-[#082e18] p-8 neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#ffffff] transition-all duration-150 flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-extrabold shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                <Award className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-black text-white uppercase tracking-tight">Milestones & Hackathons</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Upload verified certifications, student milestones, hackathon placements, and scholastic medals inside structured visual cards.
                </p>
                <div className="mt-2 text-[10px] uppercase font-black text-[#22c55e] flex items-center gap-1">
                  PLACEMENT TRUST SCORE
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="border-2 border-white bg-[#031c0e] hover:bg-[#082e18] p-8 neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#ffffff] transition-all duration-150 flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-extrabold shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-black text-white uppercase tracking-tight">Internship Records</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Compile leadership experiences, student council roles, off-campus internships, and professional records with verifiable manager loops.
                </p>
                <div className="mt-2 text-[10px] uppercase font-black text-[#22c55e] flex items-center gap-1">
                  VERIFIABLE SEMESTER PATHS
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 relative overflow-hidden bg-black/10">
        
        <div className="mx-auto max-w-7xl px-6 font-monoContainer text-center">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="border-2 border-[#22c55e] bg-black text-[#22c55e] px-4 py-1.5 text-xs font-black uppercase tracking-wider font-mono neo-shadow-white">
              [ SECURE ONBOARDING STEPS ]
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              4-PHASE IDENTITY COMPILATION
            </h2>
            <p className="text-xs text-slate-350 max-w-md font-mono uppercase">
              Initialize, configure, and compile your verified professional student card profile in under ten minutes.
            </p>
          </div>

          {/* horizontal timeline */}
          <div className="relative mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Timeline connectors in md size */}
            <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-white/20 transform -translate-y-12 hidden md:block" />

            {/* Step 1 */}
            <div className="border-2 border-white bg-[#031d0f] hover:bg-[#072414] p-6 flex flex-col items-start gap-4 relative transition-all neo-shadow-green">
              <span className="absolute top-4 right-4 text-xs font-extrabold text-[#22c55e]">01</span>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-black">
                1
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Create Account</h4>
                <p className="mt-2 text-2xs text-slate-300 leading-relaxed font-mono">
                  Register with your official college credentials to establish real educational domains.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-2 border-white bg-[#031d0f] hover:bg-[#072414] p-6 flex flex-col items-start gap-4 relative transition-all neo-shadow-white">
              <span className="absolute top-4 right-4 text-xs font-extrabold text-white">02</span>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-white bg-white text-black font-black">
                2
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Build Your Profile</h4>
                <p className="mt-2 text-2xs text-slate-300 leading-relaxed font-mono">
                  Select core departmental tags, draft your bio, and compile relevant project descriptors.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-2 border-white bg-[#031d0f] hover:bg-[#072414] p-6 flex flex-col items-start gap-4 relative transition-all neo-shadow-green">
              <span className="absolute top-4 right-4 text-xs font-extrabold text-[#22c55e]">03</span>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-white bg-[#22c55e] text-black font-black">
                3
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Add Achievements</h4>
                <p className="mt-2 text-2xs text-slate-300 leading-relaxed font-mono">
                  Connect third-party git registries, verified clouds, databases, and transcripts safely.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-2 border-white bg-[#031d0f] hover:bg-[#072414] p-6 flex flex-col items-start gap-4 relative transition-all neo-shadow-white">
              <span className="absolute top-4 right-4 text-xs font-extrabold text-white">04</span>
              <div className="flex h-10 w-10 items-center justify-center border-2 border-white bg-white text-black font-black">
                4
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">Get Recognized</h4>
                <p className="mt-2 text-2xs text-slate-300 leading-relaxed font-mono">
                  Unlock placement intelligence scores used directly by elite university coordinators.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 relative overflow-hidden border-t-2 border-white bg-[#031d0f]">
        
        <div className="mx-auto max-w-5xl px-6 relative z-10 text-center flex flex-col items-center gap-6">
          <Terminal className="h-10 w-10 text-[#22c55e] animate-bounce" />
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Start Building Your Digital Talent Portfolio
          </h2>
          
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed uppercase">
            Create your profile and showcase your complete student journey. Recruiters, hackathons, and global academic leagues await.
          </p>

          <button
            onClick={() => onNavigateToAuth(true)}
            className="border-2 border-white bg-[#22c55e] text-black font-black uppercase px-8 py-4 text-xs neo-shadow-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:box-shadow-[6px_6px_0px_#ffffff] transition-all cursor-pointer"
          >
            Get Onboarded System Now →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-white py-12 bg-[#020e06]">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xs text-slate-400 font-bold tracking-widest uppercase">
              &copy; 2026 TALENTSPHERE SECURITY DEPT. ALL VIRTUAL PORTS VERIFIED.
            </span>
          </div>
          <div className="flex items-center gap-6 text-[10px] text-slate-400 uppercase font-black">
            <span className="hover:text-white cursor-pointer hover:underline">[ Security Protocol ]</span>
            <span className="hover:text-white cursor-pointer hover:underline">[ Terms of Service ]</span>
            <span className="hover:text-white cursor-pointer hover:underline">[ Integrity Code ]</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
