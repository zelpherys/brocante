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
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          username: username.value,
          password: password.value
        }
      });
      const user = response.data.find(user => user.username === username.value && user.password === password.value);
      if (user) {
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
