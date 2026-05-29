import { useState } from "react";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import OnboardingPage from "./components/OnboardingPage";
import Dashboard from "./components/Dashboard";
import CustomCursor from "./components/CustomCursor";

type PageType = "landing" | "auth" | "onboarding" | "dashboard";

export default function App() {
  const [page, setPage] = useState<PageType>("landing");
  const [isSignUp, setIsSignUp] = useState(false);
  const [onboardingInitial, setOnboardingInitial] = useState({
    fullName: "",
    email: "",
    department: "Computer Science & Engineering",
    yearOfStudy: "3rd Year",
  });

  const handleNavigateToAuth = (signUpState = false) => {
    setIsSignUp(signUpState);
    setPage("auth");
  };

  const handleAuthenticationSuccess = (data: {
    fullName: string;
    email: string;
    department?: string;
    yearOfStudy?: string;
  }) => {
    setOnboardingInitial({
      fullName: data.fullName,
      email: data.email,
      department: data.department || "Computer Science & Engineering",
      yearOfStudy: data.yearOfStudy || "3rd Year",
    });
    // Proceed to onboarding to craft the virtual ID card
    setPage("onboarding");
  };

  const handleOnboardingCompleted = (completeProfileData: any) => {
    setOnboardingInitial(completeProfileData);
    setPage("dashboard");
  };

  const handleLogout = () => {
    setPage("landing");
  };

  return (
    <div className="relative min-h-screen select-none bg-[#020f08] text-white overflow-x-hidden antialiased bg-brutalist-grid">
      {/* Neo-brutalist scanlines screen mesh overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 crt-lines opacity-15" />
      
      {/* High-fidelity Custom Cursor (Cyan Glow Follow & Magnetic effects) */}
      <CustomCursor />

      {/* Main routed viewport outlets */}
      {page === "landing" && (
        <LandingPage onNavigateToAuth={handleNavigateToAuth} />
      )}

      {page === "auth" && (
        <AuthPage
          initialIsSignUp={isSignUp}
          onBack={() => setPage("landing")}
          onAuthSuccess={handleAuthenticationSuccess}
        />
      )}

      {page === "onboarding" && (
        <OnboardingPage
          initialData={onboardingInitial}
          onComplete={handleOnboardingCompleted}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          initialProfileData={onboardingInitial}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
