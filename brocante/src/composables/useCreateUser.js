import { ref } from 'vue';
import axios from 'axios';

export function useCreateUser() {
  const loading = ref(false);
  const error = ref(null);

  const createUser = async (userData) => {
    loading.value = true;
    error.value = null;
    try {
      // Obtenir le nombre actuel d'utilisateurs
      const usersResponse = await axios.get('http://localhost:3000/users');
      const userCount = usersResponse.data.length;

      // Ajouter un ID incrémentiel à l'utilisateur
      userData.id = userCount + 1;

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
