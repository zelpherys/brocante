import { ref } from 'vue';
import axios from 'axios';

export function useCreateArticle() {
  const title = ref('');
  const description = ref('');
  const price = ref('');
  const imageUrl = ref('');
  const error = ref(null);
  const loading = ref(false);

  const createArticle = async (userId) => {
    loading.value = true;
    error.value = null;

    // Validation des champs
    if (!title.value || !description.value || !price.value) {
      error.value = 'Tous les champs sont requis.';
      loading.value = false;
      return;
    }

    try {
      // Créer un article sans inclure l'ID, la base de données gère l'ID
      const article = {
        title: title.value,
        description: description.value,
        price: parseFloat(price.value),
        imageUrl: imageUrl.value,
        userId: userId
      };
      
      await axios.post('http://localhost:3000/articles', article);
      alert('Article créé avec succès!');
    } catch (err) {
      error.value = 'Erreur lors de la création de l\'article.';
    } finally {
      loading.value = false;
    }
  };

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
