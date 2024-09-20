import { ref } from 'vue'; // Importation de la fonction ref depuis Vue
import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP

// Déclaration d'une fonction composable nommée useDeleteArticle
export function useDeleteArticle() {
  // Création d'une référence réactive pour l'état d'erreur
  const error = ref(null);

  // Fonction asynchrone pour supprimer un article
  const deleteArticle = async (articleId, userId) => {
    try {
      // Envoie une requête DELETE pour supprimer l'article avec l'ID spécifié
      await axios.delete(`/articles/${articleId}`, { data: { userId } });
    } catch (err) {
      // Met à jour l'état d'erreur en cas d'échec
      error.value = 'Erreur lors de la suppression de l\'article';
      console.error('Erreur lors de la suppression de l\'article:', err); // Ajoute ce log pour vérifier l'erreur
    }
  };

  // Retourne la référence d'erreur et la fonction deleteArticle pour qu'elles puissent être utilisées dans les composants
  return { error, deleteArticle };
}
