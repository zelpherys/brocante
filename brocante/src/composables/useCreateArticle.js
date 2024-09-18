import { ref } from 'vue';
import axios from 'axios';

export function useCreateArticle() {
  const title = ref('');
  const descriptif = ref('');
  const prix = ref('');
  const url = ref('');
  const error = ref(null);
  const loading = ref(false);

  const createArticle = async (userId) => {
    loading.value = true;
    error.value = null;

    // Validation des champs
    if (!title.value || !descriptif.value || !prix.value) {
      error.value = 'Tous les champs sont requis.';
      loading.value = false;
      return;
    }

    try {
      // Créer un article sans inclure l'ID, la base de données gère l'ID
      const article = {
        title: title.value,
        descriptif: descriptif.value,
        prix: parseFloat(prix.value),
        url: url.value,
        user_id: userId
      };

      console.log('Données de l\'article:', article); // Ajoute ce log pour vérifier les données

      await axios.post('http://localhost:3000/articles', article);
      alert('Article créé avec succès!');
    } catch (err) {
      console.error('Erreur lors de la création de l\'article:', err); // Ajoute ce log pour vérifier l'erreur
      error.value = 'Erreur lors de la création de l\'article.';
    } finally {
      loading.value = false;
    }
  };

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
