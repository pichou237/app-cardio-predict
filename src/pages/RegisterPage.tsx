
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="w-full max-w-md bg-background p-8 rounded-lg shadow-sm border">
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
