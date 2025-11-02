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
    <div className="w-full h-screen">
      <SignedIn>
        <WelcomePage />
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto">
          <div></div>
        </div>
      </SignedOut>
    </div>
  );
};

export default PageContent;
