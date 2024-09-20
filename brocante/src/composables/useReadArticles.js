import { ref } from "vue"; // Importation de la fonction ref depuis Vue
import axios from "axios"; // Importation de la bibliothèque axios pour les requêtes HTTP

// Déclaration d'une fonction composable nommée useReadArticles
export function useReadArticles() {
  // Création de références réactives pour stocker les articles de l'utilisateur, les erreurs et l'état de chargement
  const userArticles = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // Fonction asynchrone pour récupérer les articles de l'utilisateur
  const fetchUserArticles = async (userId) => {
    loading.value = true; // Indique que le chargement est en cours
    error.value = null; // Réinitialise l'erreur

    try {
      // Envoie une requête GET pour obtenir les articles de l'utilisateur depuis l'API
      const response = await axios.get("http://localhost:3000/articles", {
        params: { userId: userId }, // Passe userId comme paramètre de requête
      });
      userArticles.value = response.data; // Met à jour la référence userArticles avec les données récupérées
    } catch (err) {
      error.value = "Erreur lors de la récupération des articles."; // Met à jour l'état d'erreur en cas d'échec
    } finally {
      loading.value = false; // Arrête le chargement
    }
  };

  // Retourne les références et la fonction fetchUserArticles pour qu'elles puissent être utilisées dans les composants
  return {
    userArticles,
    error,
    loading,
    fetchUserArticles,
  };
}
