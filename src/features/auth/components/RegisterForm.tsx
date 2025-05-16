
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/services/auth-service";

const registerSchema = z.object({
  username: z.string().min(2, { message: "Le nom d'utilisateur doit contenir au moins 2 caractères." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { username, password } = data;
      
      try {
        await AuthService.register({ username, password });
      } catch (apiError) {
        console.error("API Error:", apiError);
        // Activate offline mode if API is unreachable
        setIsOfflineMode(true);
        toast.warning("Mode hors ligne activé: API inaccessible");
        // Early return to show the offline mode message
        setIsLoading(false);
        return;
      }
      
      toast.success("Inscription réussie! Vous êtes maintenant connecté.");
      
      // Enregistrer les informations d'authentification
      localStorage.setItem("userRole", "user");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      
      // Redirection après inscription
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      toast.error(error instanceof Error ? error.message : "Échec de l'inscription. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOfflineRegister = () => {
    setIsLoading(true);
    try {
      const username = form.getValues("username") || "utilisateur.test";
      
      // Set offline user
      localStorage.setItem("userRole", "user");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("isOfflineMode", "true");
      
      toast.success("Inscription en mode hors ligne réussie!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur d'inscription offline:", error);
      toast.error("Erreur lors de l'inscription en mode hors ligne");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Créer un compte</h2>
        <p className="mt-2 text-muted-foreground">
          Inscrivez-vous pour accéder à l'outil de prédiction
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="monnomdutilisateur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>
      </Form>
      
      {isOfflineMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
          <h3 className="font-medium text-amber-800">Problème de connexion au serveur</h3>
          <p className="text-sm text-amber-700 mt-1">Le serveur semble indisponible. Vous pouvez créer un compte en mode hors ligne avec un accès limité.</p>
          <Button 
            variant="outline" 
            className="w-full mt-2 border-amber-500 text-amber-700 hover:bg-amber-100"
            onClick={handleOfflineRegister}
            disabled={isLoading}
          >
            {isLoading ? "Inscription en cours..." : "Créer un compte hors ligne"}
          </Button>
        </div>
      )}
      
      <div className="text-center text-sm">
        <p>
          Déjà un compte?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
