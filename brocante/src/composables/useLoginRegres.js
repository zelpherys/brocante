import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

export function useLogin() {
  const username = ref('');
  const password = ref('');
  const error = ref(null);
  const loading = ref(false);
  const authStore = useAuthStore();

  const login = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: username.value,
        password: password.value
      });
      const user = response.data;
      if (user.token) {
        authStore.login(user);
        return user;
      } else {
        error.value = 'Identifiants incorrects.';
      }
    } catch (err) {
      error.value = 'Erreur de connexion. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    authStore.logout();
  };

  return {
    username,
    password,
    error,
    loading,
    login,
    logout
  };
}
