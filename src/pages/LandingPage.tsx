
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/features/landing/components/Hero";
import Features from "@/features/landing/components/Features";
import HeartModel3D from "@/features/landing/components/HeartModel3D";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Modèle Cardiaque 3D Interactif</h2>
          <HeartModel3D />
        </div>
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
