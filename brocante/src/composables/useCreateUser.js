import { ref } from 'vue';
import axios from 'axios';

export function useCreateUser() {
  const loading = ref(false);
  const error = ref(null);

  const createUser = async (userData) => {
    loading.value = true;
    error.value = null;
    try {
      console.log('Données envoyées:', userData); // Afficher les données envoyées
      const response = await axios.post('http://localhost:3000/users', userData);
      return response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    createUser,
    loading,
    error
  };
}
