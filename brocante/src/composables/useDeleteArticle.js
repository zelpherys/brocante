import { ref } from 'vue';
import axios from 'axios';

export function useDeleteArticle() {
  const error = ref(null);

  const deleteArticle = async (articleId, userId) => {
    try {
      await axios.delete(`/articles/${articleId}`, { data: { userId } });
    } catch (err) {
      error.value = 'Erreur lors de la suppression de l\'article';
      console.error('Erreur lors de la suppression de l\'article:', err);
    }
  };

  return { error, deleteArticle };
}
