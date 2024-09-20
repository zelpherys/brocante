import { ref } from 'vue'; // Importation de la fonction ref depuis Vue
import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP

// Déclaration d'une fonction composable nommée useCreateArticle
export function useCreateArticle() {
  // Création de références réactives pour les champs du formulaire et les états
  const title = ref('');
  const descriptif = ref('');
  const prix = ref('');
  const url = ref('');
  const error = ref(null);
  const loading = ref(false);

  // Fonction asynchrone pour créer un article
  const createArticle = async (userId) => {
    loading.value = true; // Indique que le chargement est en cours
    error.value = null; // Réinitialise l'erreur

    // Validation des champs
    if (!title.value || !descriptif.value || !prix.value) {
      error.value = 'Tous les champs sont requis.'; // Affiche un message d'erreur si des champs sont manquants
      loading.value = false; // Arrête le chargement
      return; // Sort de la fonction
    }

    try {
      // Créer un objet article sans inclure l'ID, la base de données gère l'ID
      const article = {
        title: title.value,
        descriptif: descriptif.value,
        prix: parseFloat(prix.value), // Convertit le prix en nombre flottant
        url: url.value,
        user_id: userId // Ajoute l'ID de l'utilisateur
      };

      console.log('Données de l\'article:', article); // Ajoute ce log pour vérifier les données

      // Envoie une requête POST pour créer l'article
      await axios.post('http://localhost:3000/articles', article);
      alert('Article créé avec succès!'); // Affiche une alerte de succès
    } catch (err) {
      console.error('Erreur lors de la création de l\'article:', err); // Ajoute ce log pour vérifier l'erreur
      error.value = 'Erreur lors de la création de l\'article.'; // Met à jour l'état d'erreur
    } finally {
      loading.value = false; // Arrête le chargement
    }
  };

  // Retourne les références et la fonction createArticle pour qu'elles puissent être utilisées dans les composants
  return {
    title,
    descriptif,
    prix,
    url,
    error,
    loading,
    createArticle
  };
}
