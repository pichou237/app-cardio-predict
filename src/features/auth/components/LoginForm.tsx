
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
import { AuthService, AuthCredentials } from "@/services/auth-service";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Le nom d'utilisateur est requis." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const DEFAULT_CREDENTIALS = [
  { username: "admin@admin.com", password: "admin123", role: "admin" },
  { username: "utilisateur.test@offline.com", password: "test123", role: "user" },
];

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Cast to AuthCredentials to ensure type safety
      const credentials: AuthCredentials = {
        username: data.username,
        password: data.password
      };
      
      try {
        const response = await AuthService.login(credentials);
        
        if (response && response.api_key) {
          // Authentification réussie via l'API
          localStorage.setItem("userRole", "user"); // Par défaut utilisateur normal
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userEmail", data.username);
          localStorage.setItem("isOfflineMode", "false");
          
          toast.success("Connexion réussie!");
          navigate("/dashboard");
          return;
        }
      } catch (apiError: any) {
        console.error("API Error:", apiError);
        
        // Si l'erreur indique que l'utilisateur n'existe pas
        if (apiError.message && apiError.message.includes("utilisateur non trouvé")) {
          setLoginError("Utilisateur non trouvé. Veuillez vérifier vos identifiants ou créer un compte.");
          setIsLoading(false);
          return;
        }
        
        // Sinon, activer le mode hors ligne
        setIsOfflineMode(true);
        toast.warning("Mode hors ligne activé: API inaccessible");
      }
      
      // Vérifier les identifiants par défaut (pour démo et mode hors ligne)
      const matchedUser = DEFAULT_CREDENTIALS.find(
        user => user.username === data.username && user.password === data.password
      );
      
      if (matchedUser) {
        // Stocker les infos utilisateur dans localStorage
        localStorage.setItem("userRole", matchedUser.role);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", matchedUser.username);
        localStorage.setItem("isOfflineMode", isOfflineMode ? "true" : "false");
        
        if (matchedUser.role === "admin") {
          toast.success("Connexion administrateur réussie!");
          navigate("/admin");
        } else {
          toast.success("Connexion réussie!");
          navigate("/dashboard");
        }
      } else {
        // Aucune correspondance avec les identifiants par défaut
        setLoginError("Identifiants incorrects. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setLoginError(error instanceof Error ? error.message : "Échec de la connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfflineLogin = () => {
    setIsLoading(true);
    try {
      // Définir l'utilisateur hors ligne
      localStorage.setItem("userRole", "user");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", "utilisateur.test@offline.com");
      localStorage.setItem("isOfflineMode", "true");
      
      toast.success("Connexion en mode hors ligne réussie!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion offline:", error);
      toast.error("Erreur lors de la connexion en mode hors ligne");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Se connecter</h2>
        <p className="mt-2 text-muted-foreground">
          Entrez vos identifiants pour accéder à votre compte
        </p>
      </div>
      
      {loginError && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Erreur de connexion</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input placeholder="votrenomdutilisateur" {...field} />
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
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </Form>
      
      {isOfflineMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
          <h3 className="font-medium text-amber-800">Problème de connexion au serveur</h3>
          <p className="text-sm text-amber-700 mt-1">Le serveur semble indisponible. Vous pouvez continuer en mode hors ligne avec un accès limité.</p>
          <Button 
            variant="outline" 
            className="w-full mt-2 border-amber-500 text-amber-700 hover:bg-amber-100"
            onClick={handleOfflineLogin}
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Continuer en mode hors ligne"}
          </Button>
        </div>
      )}
      
      <div className="text-center text-sm">
        <p>
          Pas encore de compte?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            S'inscrire
          </Link>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Accès admin: admin@admin.com / admin123
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
