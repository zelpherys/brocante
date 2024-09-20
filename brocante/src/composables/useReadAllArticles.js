import { ref } from "vue"; // Importation de la fonction ref depuis Vue
import axios from "axios"; // Importation de la bibliothèque axios pour les requêtes HTTP

// Déclaration d'une fonction composable nommée useReadAllArticles
export function useReadAllArticles() {
  // Création de références réactives pour stocker les articles, les erreurs et l'état de chargement
  const allArticles = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // Fonction asynchrone pour récupérer tous les articles
  const fetchAllArticles = async () => {
    loading.value = true; // Indique que le chargement est en cours
    error.value = null; // Réinitialise l'erreur

    try {
      // Envoie une requête GET pour récupérer tous les articles
      const response = await axios.get("http://localhost:3000/all-articles");
      allArticles.value = response.data; // Met à jour la référence allArticles avec les données récupérées
    } catch (err) {
      error.value = "Erreur lors de la récupération des articles."; // Met à jour l'état d'erreur en cas d'échec
    } finally {
      loading.value = false; // Arrête le chargement
    }
  };

  // Retourne les références et la fonction fetchAllArticles pour qu'elles puissent être utilisées dans les composants
  return {
    allArticles,
    error,
    loading,
    fetchAllArticles,
  };
}
