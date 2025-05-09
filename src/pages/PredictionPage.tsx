
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PredictionForm from "@/features/prediction/components/PredictionForm";

const PredictionPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Prédiction de risque cardiaque</h1>
            <p className="text-muted-foreground">
              Complétez le formulaire ci-dessous pour obtenir une analyse de votre risque cardiaque
            </p>
          </div>
          
          <div className="bg-background p-6 rounded-lg shadow-sm border">
            <PredictionForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PredictionPage;
