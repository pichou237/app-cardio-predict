
import { API_ENDPOINTS, getAuthHeaders, saveApiKey, removeApiKey } from "./api-config";

// Interface pour les données d'inscription/connexion
export interface AuthCredentials {
  username: string;
  email:string;
  password: string;
  role:string
}

// Interface pour la mise à jour du profil utilisateur
export interface UpdateUserData {
  api_key: string;
  new_username?: string;
  new_password?: string;
}

// Interface pour la réponse d'authentification
interface AuthResponse {
  api_key: string;
}

// Service d'authentification
export const AuthService = {
  // Inscription d'un nouvel utilisateur
  register: async (credentials: AuthCredentials): Promise<string> => {
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("Ce nom d'utilisateur existe déjà.");
        } else if (response.status === 400) {
          throw new Error("Format de données invalide.");
        } else {
          throw new Error("Erreur lors de l'inscription.");
        }
      }

      const data = await response.json() as AuthResponse;
      saveApiKey(data.api_key);
      return data.api_key;
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  },

  // Connexion utilisateur
  login: async (credentials: AuthCredentials): Promise<string> => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
        } else {
          throw new Error("Erreur lors de la connexion.");
        }
      }

      const data = await response.json() as AuthResponse;
      console.log("user data:",data)
      localStorage.setItem("username", credentials.username);
      return data.api_key;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  },

  // Mise à jour des informations utilisateur
  updateUser: async (username: string, updateData: UpdateUserData): Promise<void> => {
    try {
      const response = await fetch(API_ENDPOINTS.UPDATE_USER(username), {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Accès non autorisé.");
        } else {
          throw new Error("Erreur lors de la mise à jour du profil.");
        }
      }

      // Si le nom d'utilisateur a été changé, mettre à jour le localStorage
      if (updateData.new_username) {
        localStorage.setItem("username", updateData.new_username);
      }

      // Si une nouvelle clé API est retournée (cas d'un changement de nom d'utilisateur)
      const data = await response.json();
      if (data.api_key) {
        saveApiKey(data.api_key);
      }
    } catch (error) {
      console.error("Erreur de mise à jour du profil:", error);
      throw error;
    }
  },

  // Déconnexion de l'utilisateur
  logout: (): void => {
    removeApiKey();
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  },
};
