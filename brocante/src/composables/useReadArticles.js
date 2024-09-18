import { ref } from "vue";
import axios from "axios";

export function useReadArticles() {
  const userArticles = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // Fonction pour récupérer les articles de l'utilisateur
  const fetchUserArticles = async (userId) => {
    loading.value = true;
    error.value = null;
    try {
      // Requête pour obtenir les articles de l'utilisateur depuis l'API
      const response = await axios.get("http://localhost:3000/articles", {
        params: { userId: userId }, // Passer userId comme paramètre de requête
      });
      userArticles.value = response.data;
    } catch (err) {
      error.value = "Erreur lors de la récupération des articles.";
    } finally {
      loading.value = false;
    }
  };

  return {
    userArticles,
    error,
    loading,
    fetchUserArticles,
  };
}
