import { ref } from 'vue'; // Importation de ref pour créer des références réactives
import axios from 'axios'; // Importation d'axios pour les requêtes HTTP

export function useCreateArticle() {
  const title = ref(''); // Référence réactive pour le titre de l'article
  const description = ref(''); // Référence réactive pour la description de l'article
  const price = ref(''); // Référence réactive pour le prix de l'article
  const imageUrl = ref(''); // Référence réactive pour l'URL de l'image de l'article
  const error = ref(null); // Référence réactive pour les erreurs
  const loading = ref(false); // Référence réactive pour l'état de chargement

  // Fonction pour créer un nouvel article
  const createArticle = async (userId) => {
    loading.value = true; // Définir l'état de chargement à true
    error.value = null; // Réinitialiser l'erreur
    try {
      // Requête pour obtenir le nombre actuel d'articles depuis l'API
      const articlesResponse = await axios.get('http://localhost:3000/articles');
      const articleCount = articlesResponse.data.length; // Stocker le nombre d'articles

      // Créer un nouvel article avec un ID incrémentiel
      const article = {
        id: articleCount + 1,
        title: title.value,
        description: description.value,
        price: price.value,
        imageUrl: imageUrl.value,
        userId: userId // Associer l'article à l'utilisateur qui le crée
      };

      // Requête pour créer un nouvel article avec les données fournies
      await axios.post('http://localhost:3000/articles', article);
      alert('Article créé avec succès!'); // Afficher une alerte de succès
    } catch (err) {
      error.value = 'Erreur lors de la création de l\'article.'; // Définir un message d'erreur en cas d'échec de la requête
    } finally {
      loading.value = false; // Définir l'état de chargement à false
    }
  };

  // Retour des variables et fonctions pour les rendre disponibles dans le composant
  return {
    title,
    description,
    price,
    imageUrl,
    error,
    loading,
    createArticle
  };
}
