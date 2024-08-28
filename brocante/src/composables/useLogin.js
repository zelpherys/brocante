import { ref } from 'vue'; // Importation de ref pour créer des références réactives
import axios from 'axios'; // Importation d'axios pour les requêtes HTTP

export function useLogin() {
  const username = ref(''); // Référence réactive pour le pseudo
  const password = ref(''); // Référence réactive pour le mot de passe
  const error = ref(null); // Référence réactive pour les erreurs
  const loading = ref(false); // Référence réactive pour l'état de chargement

  // Fonction pour gérer la connexion de l'utilisateur
  const login = async () => {
    loading.value = true; // Définir l'état de chargement à true
    error.value = null; // Réinitialiser l'erreur
    try {
      // Requête pour obtenir les utilisateurs depuis l'API
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          username: username.value,
          password: password.value
        }
      });
      // Trouver l'utilisateur correspondant aux identifiants fournis
      const user = response.data.find(user => user.username === username.value && user.password === password.value);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Stocker les informations de l'utilisateur dans le localStorage
        return user; // Retourner l'utilisateur si trouvé
      } else {
        error.value = 'Identifiants incorrects.'; // Définir un message d'erreur si les identifiants sont incorrects
      }
    } catch (err) {
      error.value = 'Erreur de connexion. Veuillez réessayer.'; // Définir un message d'erreur en cas d'échec de la requête
    } finally {
      loading.value = false; // Définir l'état de chargement à false
    }
  };

  // Retour des variables et fonctions pour les rendre disponibles dans le composant
  return {
    username,
    password,
    error,
    loading,
    login
  };
}
