import { ref } from 'vue';
import axios from 'axios';

export function useUpdateArticle() {
  const error = ref(null);
  const loading = ref(false);

  const updateArticle = async (articleId, updatedArticle) => {
    loading.value = true;
    error.value = null;

    try {
      await axios.put(`http://localhost:3000/articles/${articleId}`, updatedArticle);
      alert('Article mis à jour avec succès!');
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour de l\'article.';
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    loading,
    updateArticle
  };
}
