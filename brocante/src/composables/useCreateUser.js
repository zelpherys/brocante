import { ref } from 'vue'; // Importation de ref pour créer des références réactives
import axios from 'axios'; // Importation d'axios pour les requêtes HTTP

export function useCreateUser() {
  const loading = ref(false); // Référence réactive pour l'état de chargement
  const error = ref(null); // Référence réactive pour les erreurs

  // Fonction pour créer un nouvel utilisateur
  const createUser = async (userData) => {
    loading.value = true; // Définir l'état de chargement à true
    error.value = null; // Réinitialiser l'erreur
    try {
      // Requête pour obtenir le nombre actuel d'utilisateurs depuis l'API
      const usersResponse = await axios.get('http://localhost:3000/users');
      const userCount = usersResponse.data.length; // Stocker le nombre d'utilisateurs

      // Ajouter un ID incrémentiel à l'utilisateur
      userData.id = userCount + 1;

      // Requête pour créer un nouvel utilisateur avec les données fournies
      const response = await axios.post('http://localhost:3000/users', userData);
      return response.data; // Retourner les données de l'utilisateur créé
    } catch (err) {
      error.value = err; // Définir l'erreur en cas d'échec de la requête
    } finally {
      loading.value = false; // Définir l'état de chargement à false
    }
  };

  // Retour des variables et fonctions pour les rendre disponibles dans le composant
  return {
    createUser,
    loading,
    error
  };
}
