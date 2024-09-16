// import { ref } from 'vue';
// import axios from 'axios';
// import { useAuthStore } from '@/stores/authStore';

// export function useLogin() {
//   const username = ref('');
//   const password = ref('');
//   const error = ref(null);
//   const loading = ref(false);
//   const authStore = useAuthStore();

//   const login = async () => {
//     loading.value = true;
//     error.value = null;
//     try {
//       const response = await axios.get('http://localhost:3000/users', {
//         params: {
//           username: username.value,
//           password: password.value
//         }
//       });
//       const user = response.data.find(user => user.username === username.value && user.password === password.value);
//       if (user) {
//         authStore.login(user);
//         return user;
//       } else {
//         error.value = 'Identifiants incorrects.';
//       }
//     } catch (err) {
//       error.value = 'Erreur de connexion. Veuillez réessayer.';
//     } finally {
//       loading.value = false;
//     }
//   };

//   const logout = () => {
//     authStore.logout();
//   };

//   return {
//     username,
//     password,
//     error,
//     loading,
//     login,
//     logout
//   };
// }


import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore'; // Pour stocker l'état de l'utilisateur connecté

export function useLogin() {
  const username = ref(''); // Champ du pseudo de l'utilisateur
  const password = ref(''); // Champ du mot de passe
  const error = ref(null);  // Variable d'erreur pour afficher les messages d'erreurs
  const loading = ref(false);  // État de chargement pendant la requête
  const authStore = useAuthStore();  // Accès au store d'authentification (si utilisé)

  const login = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('http://localhost:3000/login', {
        nom: username.value,   // Utiliser 'nom' à la place de 'email'
        password: password.value
      });
  
      console.log('Réponse du serveur :', response.data);  // Afficher la réponse du serveur
  
      if (response.data.user) {
        authStore.login(response.data.user);
        return response.data.user;
      } else {
        error.value = 'Identifiants incorrects.';
      }
    } catch (err) {
      error.value = 'Erreur de connexion. Veuillez réessayer.';
    } finally {
      loading.value = false;
    }
  };
  

  // Fonction pour gérer la déconnexion
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