import { ref } from "vue";
import axios from "axios";

export function useReadAllArticles() {
  const allArticles = ref([]);
  const error = ref(null);
  const loading = ref(false);

  // Fonction pour récupérer tous les articles
  const fetchAllArticles = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get("http://localhost:3000/all-articles");
      allArticles.value = response.data;
    } catch (err) {
      error.value = "Erreur lors de la récupération des articles.";
    } finally {
      loading.value = false;
    }
  };

  return {
    allArticles,
    error,
    loading,
    fetchAllArticles,
  };
}
