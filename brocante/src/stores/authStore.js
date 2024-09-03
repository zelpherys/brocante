// Importation de fonctions utilitaires de Pinia et Vue
import { defineStore } from "pinia"; // Pinia est un gestionnaire d'état pour Vue.js, similaire à Vuex
import { ref, computed } from "vue"; // 'ref' et 'computed' sont des fonctions réactives de Vue

// Définition d'un store Pinia appelé 'auth' avec une fonction de configuration
export const useAuthStore = defineStore("auth", () => {
  // Déclaration d'une référence réactive pour l'utilisateur, initialisée à partir du stockage local
  const user = ref(JSON.parse(localStorage.getItem("user")));

  // Déclaration d'une propriété calculée pour vérifier si l'utilisateur est connecté
  const isLoggedIn = computed(() => !!user.value);
  // 'isLoggedIn' retourne 'true' si 'user.value' existe (c'est-à-dire que l'utilisateur est connecté),
  // sinon 'false'

  // Fonction pour gérer la connexion de l'utilisateur
  const login = (userData) => {
    // Mise à jour de la référence réactive 'user' avec les données de l'utilisateur connecté
    user.value = userData;
    // Stockage des données de l'utilisateur dans le stockage local pour persistance après actualisation
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const logout = () => {
    // Réinitialisation de la référence réactive 'user' à 'null' pour déconnecter l'utilisateur
    user.value = null;
    // Suppression des données de l'utilisateur du stockage local pour empêcher la persistance de l'état connecté
    localStorage.removeItem("user");
  };

  // Retourne les propriétés et méthodes du store, accessibles à d'autres composants
  return { user, isLoggedIn, login, logout };
});
