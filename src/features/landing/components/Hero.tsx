
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24">
      {/* Background Gradient Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50"
        initial={{ opacity: 0.5 }}
        animate={{ 
          opacity: [0.5, 0.7, 0.5], 
          background: [
            "linear-gradient(to right, rgba(238,234,255,0.5), rgba(219,234,254,0.5), rgba(238,234,255,0.5))",
            "linear-gradient(to right, rgba(224,231,255,0.7), rgba(219,234,254,0.7), rgba(224,231,255,0.7))",
            "linear-gradient(to right, rgba(238,234,255,0.5), rgba(219,234,254,0.5), rgba(238,234,255,0.5))"
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8,
          ease: "easeInOut"
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight text-primary sm:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Prévention des maladies cardiaques par l'IA
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Notre outil de prédiction utilise l'intelligence artificielle pour évaluer vos risques de maladies cardiaques
              à partir de vos données médicales et vous fournir des analyses personnalisées.
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="relative overflow-hidden group"
              >
                <Link to="/register">
                  <span className="relative z-10">Commencer maintenant</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Se connecter</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto"
          >
            <div className="relative mx-auto max-w-lg">
              <motion.img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop"
                alt="Modèle cardiaque 3D"
                className="w-full rounded-2xl shadow-2xl shadow-primary/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              />

              {/* Floating UI elements with staggered animations */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg flex items-center gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="h-5 w-5 rounded-full bg-green-500"></div>
                <p className="text-sm font-medium">IA avancée</p>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <p className="text-sm font-medium">Prédictions précises à 95%</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
