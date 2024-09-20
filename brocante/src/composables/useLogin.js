import { ref } from 'vue'; // Importation de la fonction ref depuis Vue
import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP
import { useAuthStore } from '@/stores/authStore'; // Importation du store d'authentification pour gérer l'état de l'utilisateur connecté

// Déclaration d'une fonction composable nommée useLogin
export function useLogin() {
  // Création de références réactives pour les champs du formulaire et les états
  const username = ref(''); // Champ du pseudo de l'utilisateur
  const password = ref(''); // Champ du mot de passe
  const error = ref(null);  // Variable d'erreur pour afficher les messages d'erreurs
  const loading = ref(false);  // État de chargement pendant la requête
  const authStore = useAuthStore();  // Accès au store d'authentification (si utilisé)

  // Fonction asynchrone pour gérer la connexion de l'utilisateur
  const login = async () => {
    loading.value = true; // Indique que le chargement est en cours
    error.value = null; // Réinitialise l'erreur

    try {
      // Envoie une requête POST pour connecter l'utilisateur
      const response = await axios.post('http://localhost:3000/login', {
        nom: username.value,   // Utiliser 'nom' à la place de 'email'
        password: password.value
      });

      console.log('Réponse du serveur :', response.data);  // Affiche la réponse du serveur pour vérification

      if (response.data.user) {
        authStore.login(response.data.user); // Met à jour l'état d'authentification avec les données de l'utilisateur
        return response.data.user; // Retourne les données de l'utilisateur
      } else {
        error.value = 'Identifiants incorrects.'; // Affiche un message d'erreur si les identifiants sont incorrects
      }
    } catch (err) {
      error.value = 'Erreur de connexion. Veuillez réessayer.'; // Met à jour l'état d'erreur en cas d'échec
    } finally {
      loading.value = false; // Arrête le chargement
    }
  };

  // Fonction pour gérer la déconnexion
  const logout = () => {
    authStore.logout(); // Appelle la méthode de déconnexion du store d'authentification
  };

  // Retourne les références et les fonctions login et logout pour qu'elles puissent être utilisées dans les composants
  return {
    username,
    password,
    error,
    loading,
    login,
    logout
  };
}
