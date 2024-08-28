<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Titre de la page de connexion -->
      <h2>Connexion</h2>
      <!-- Formulaire de connexion -->
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <!-- Champ pour le pseudo de l'utilisateur -->
          <label for="username">Pseudo:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <!-- Champ pour le mot de passe de l'utilisateur -->
          <label for="password">Mot de passe:</label>
          <input type="password" v-model="password" required />
        </div>
        <!-- Bouton pour soumettre le formulaire de connexion -->
        <button type="submit">Se connecter</button>
      </form>
      <!-- Affichage d'un message d'erreur si une erreur survient -->
      <p v-if="error">{{ error }}</p>
      <!-- Affichage de l'état de chargement -->
      <p v-if="loading">Connexion en cours...</p>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from '@/composables/useLogin'; // Importation du composable useLogin
import { useRouter } from 'vue-router'; // Importation du composable useRouter pour la navigation

// Utilisation du composable useLogin pour obtenir les variables et fonctions nécessaires
const { username, password, error, loading, login } = useLogin();
const router = useRouter(); // Utilisation du composable useRouter pour la navigation

// Fonction pour gérer la soumission du formulaire de connexion
const loginUser = async () => {
  const user = await login(); // Appel de la fonction login pour authentifier l'utilisateur
  if (user) {
    router.push('/board'); // Redirection vers la page de tableau de bord si la connexion est réussie
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 20%; /* Augmentation de la largeur */
  padding: 40px; /* Augmentation du padding */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px; /* Augmentation du padding */
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px; /* Augmentation du padding */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  color: red;
}
</style>
