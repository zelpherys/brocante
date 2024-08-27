<template>
    <div>
      <!-- Titre de la page de connexion -->
      <h2>Connexion</h2>
      <!-- Formulaire de connexion -->
      <form @submit.prevent="loginUser">
        <div>
          <!-- Champ pour le pseudo de l'utilisateur -->
          <label for="username">Pseudo:</label>
          <input type="text" v-model="username" required />
        </div>
        <div>
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
  
  