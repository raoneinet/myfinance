"use client";
import WelcomePage from "../welcome/page";
import { SignedIn } from "@/components/signedin";
import { SignedOut } from "@/components/signedout";
import { LoadingSpinner } from "@/components/loadingSpinner";
import { useAuthContext } from "@/app/context/authContext";

const PageContent = () => {
  const { loading } = useAuthContext();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full h-screen bg-indigo-50">
      <SignedIn>
        <WelcomePage />
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto">
          <div>Devo construir uma LP ou página de apresentação.</div>
        </div>
      </SignedOut>
    </div>
  );
};

export default PageContent;
