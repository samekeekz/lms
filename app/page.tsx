import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  Hero,
  ForWhom,
  AboutNuet,
  CourseValue,
  LearningFormat,
  CourseProgram,
  Teachers,
  TrialForm,
  Pricing,
  FAQ,
  FinalCTA,
} from "@/components/landing";

export default async function HomePage() {
  const { userId } = auth();

  if (userId) { 
    return redirect("/dashboard");
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <ForWhom />
      <AboutNuet />
      <CourseValue />
      <LearningFormat />
      <CourseProgram />
      <Teachers />
      <TrialForm />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

