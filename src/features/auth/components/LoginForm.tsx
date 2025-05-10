
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

const loginSchema = z.object({
  email: z.string().email({ message: "Veuillez saisir un email valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulated authentication
      console.log("Tentative de connexion avec:", data);
      
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin authentication check
      if (data.email === "admin@admin.com" && data.password === "admin123") {
        // Store admin status in localStorage for persistence
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("isAuthenticated", "true");
        toast.success("Connexion administrateur réussie!");
        navigate("/admin");
      } else {
        // Regular user authentication
        localStorage.setItem("userRole", "user");
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.email);
        toast.success("Connexion réussie!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      toast.error("Échec de la connexion. Veuillez réessayer.");
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
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemple@email.com" {...field} />
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
