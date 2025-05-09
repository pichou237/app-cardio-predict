
import React from "react";
import { motion } from "framer-motion";
import { Heart, Activity, BarChart3, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HeartModel3D from "./HeartModel3D";

const Features: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      title: "Analyse des risques cardiaques",
      description:
        "Notre algorithme analyse plus de 20 facteurs de risque pour prédire avec précision vos risques cardiovasculaires."
    },
    {
      icon: <Activity className="h-10 w-10 text-blue-500" />,
      title: "Suivi personnalisé",
      description:
        "Recevez des recommandations adaptées à votre profil de risque et suivez votre progression au fil du temps."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-green-500" />,
      title: "Visualisation des données",
      description:
        "Consultez des graphiques interactifs qui illustrent clairement vos facteurs de risque et leur impact sur votre santé."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-purple-500" />,
      title: "Confidentialité garantie",
      description:
        "Vos données sont strictement confidentielles et protégées par un cryptage de pointe conforme aux normes médicales."
    }
  ];

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Comment fonctionne notre prédiction cardiaque
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Notre technologie innovante combine intelligence artificielle et expertise médicale 
            pour vous offrir des prédictions fiables et personnalisées.
          </motion.p>
        </div>

        {/* Cœur 3D interactif */}
        <motion.div 
          className="mt-10 w-full max-w-md mx-auto relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <HeartModel3D />
        </motion.div>

        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-fit">{feature.icon}</div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-100/50 to-blue-100/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Pourquoi choisir notre solution</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
                <span>Précision de prédiction supérieure à 95%</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
                <span>Interface intuitive et facile à utiliser</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
                <span>Résultats instantanés et rapports détaillés</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">✓</span>
                <span>Suivi continu de votre santé cardiaque</span>
              </li>
            </ul>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop" 
              alt="Technologie médicale"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Technologie avancée</h3>
              <p className="text-white/90">Notre IA utilise des algorithmes d'apprentissage profond constamment mis à jour avec les dernières recherches médicales.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
