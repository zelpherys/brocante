import { ref } from "vue"; // Importation de ref pour créer des références réactives
import axios from "axios"; // Importation d'axios pour les requêtes HTTP

export function useReadArticles() {
  const userArticles = ref([]); // Référence réactive pour stocker les articles de l'utilisateur
  const error = ref(null); // Référence réactive pour les erreurs
  const loading = ref(false); // Référence réactive pour l'état de chargement

  // Fonction pour récupérer les articles de l'utilisateur
  const fetchUserArticles = async (userId) => {
    loading.value = true; // Définir l'état de chargement à true
    error.value = null; // Réinitialiser l'erreur
    try {
      // Requête pour obtenir les articles de l'utilisateur depuis l'API
      const response = await axios.get("http://localhost:3000/articles", {
        params: {
          userId: userId, // Filtrer les articles par l'ID de l'utilisateur
        },
      });
      userArticles.value = response.data; // Stocker les articles récupérés dans la référence réactive
    } catch (err) {
      error.value = "Erreur lors de la récupération des articles."; // Définir un message d'erreur en cas d'échec de la requête
    } finally {
      loading.value = false; // Définir l'état de chargement à false
    }
  };

  // Retour des variables et fonctions pour les rendre disponibles dans le composant
  return {
    userArticles,
    error,
    loading,
    fetchUserArticles,
  };
}
