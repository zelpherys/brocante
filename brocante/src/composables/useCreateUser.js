import { ref } from 'vue'; // Importation de la fonction ref depuis Vue
import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP

// Déclaration d'une fonction composable nommée useCreateUser
export function useCreateUser() {
  // Création de références réactives pour les états de chargement et d'erreur
  const loading = ref(false);
  const error = ref(null);

  // Fonction asynchrone pour créer un utilisateur
  const createUser = async (userData) => {
    loading.value = true; // Indique que le chargement est en cours
    error.value = null; // Réinitialise l'erreur

    try {
      console.log('Données envoyées:', userData); // Affiche les données envoyées pour vérification

      // Envoie une requête POST pour créer l'utilisateur
      const response = await axios.post('http://localhost:3000/users', userData);
      return response.data; // Retourne les données de la réponse
    } catch (err) {
      error.value = err; // Met à jour l'état d'erreur en cas d'échec
    } finally {
      loading.value = false; // Arrête le chargement
    }
  };

  // Retourne les références et la fonction createUser pour qu'elles puissent être utilisées dans les composants
  return {
    createUser,
    loading,
    error
  };
}
