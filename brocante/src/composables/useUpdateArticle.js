import { ref } from 'vue'; // Importation de la fonction ref depuis Vue
import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP

// Déclaration d'une fonction composable nommée useUpdateArticle
export function useUpdateArticle() {
  // Création de références réactives pour l'état d'erreur et l'état de chargement
  const error = ref(null);
  const loading = ref(false);

  // Fonction asynchrone pour mettre à jour un article
  const updateArticle = async (articleId, updatedArticle) => {
    loading.value = true; // Indique que le chargement est en cours
    error.value = null; // Réinitialise l'erreur

    try {
      // Envoie une requête PUT pour mettre à jour l'article avec l'ID spécifié
      await axios.put(`http://localhost:3000/articles/${articleId}`, updatedArticle);
      alert('Article mis à jour avec succès!'); // Affiche une alerte de succès
    } catch (err) {
      error.value = 'Erreur lors de la mise à jour de l\'article.'; // Met à jour l'état d'erreur en cas d'échec
    } finally {
      loading.value = false; // Arrête le chargement
    }
  };

  // Retourne les références et la fonction updateArticle pour qu'elles puissent être utilisées dans les composants
  return {
    error,
    loading,
    updateArticle
  };
}
