import { ref } from 'vue';
import axios from 'axios';

export function useDeleteArticle() {
  const error = ref(null);
  const loading = ref(false);

  const deleteArticle = async (articleId) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`http://localhost:3000/articles/${articleId}`);
      alert('Article supprimé avec succès !');
    } catch (err) {
      error.value = 'Erreur lors de la suppression de l\'article.';
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    loading,
    deleteArticle,
  };
}