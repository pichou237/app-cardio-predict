
import { API_ENDPOINTS, getAdminHeaders } from "./api-config";

// Interface pour un utilisateur dans l'administration
export interface AdminUserEntry {
  id: number;
  username: string;
  predictions_count: number;
  last_activity: string;
}

// Interface pour un utilisateur public
export interface PublicUserEntry {
  username: string;
  account_age_days: number;
}

// Interface pour les réponses de liste d'utilisateurs
export interface UsersResponse {
  users: AdminUserEntry[] | PublicUserEntry[];
}

// Service d'administration
export const AdminService = {
  // Obtenir la liste complète des utilisateurs (admin uniquement)
  getAllUsers: async (adminKey: string): Promise<AdminUserEntry[]> => {
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_USERS, {
        method: "GET",
        headers: getAdminHeaders(adminKey),
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("Accès administrateur refusé.");
        } else {
          throw new Error("Erreur lors de la récupération des utilisateurs.");
        }
      }

      const data = await response.json() as UsersResponse;
      return data.users as AdminUserEntry[];
    } catch (error) {
      console.error("Erreur de récupération des utilisateurs:", error);
      throw error;
    }
  },

  // Obtenir la liste publique des utilisateurs
  getPublicUsers: async (): Promise<PublicUserEntry[]> => {
    try {
      const response = await fetch(API_ENDPOINTS.PUBLIC_USERS, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des utilisateurs publics.");
      }

      const data = await response.json() as UsersResponse;
      return data.users as PublicUserEntry[];
    } catch (error) {
      console.error("Erreur de récupération des utilisateurs publics:", error);
      throw error;
    }
  },
};
