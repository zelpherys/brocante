<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Connexion</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="username">Nom d'utilisateur :</label>
          <!-- Modifié -->
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" :disabled="loading">Se connecter</button>
      </form>

      <!-- Affichage des erreurs si la connexion échoue -->
      <p v-if="error">{{ error }}</p>

      <!-- Affichage d'un message de chargement pendant la requête -->
      <p v-if="loading">Connexion en cours...</p>
    </div>
  </div>
</template>

<script setup>
import { useLogin } from "@/composables/useLogin"; // Importation du composable useLogin
import { useRouter } from "vue-router"; // Utilisation du router pour la redirection après connexion

// Utilisation du composable useLogin pour gérer la logique de connexion
const { username, password, error, loading, login } = useLogin();
const router = useRouter(); // Pour naviguer vers une autre page après connexion

// Fonction pour soumettre le formulaire de connexion
const loginUser = async () => {
  const user = await login(); // Appel de la fonction login pour tenter la connexion

  if (user) {
    // Si la connexion réussit, redirection vers la page du tableau de bord
    router.push("/board"); // Remplace '/board' par la route de ton tableau de bord
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
