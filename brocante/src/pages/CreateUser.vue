<template>
  <div class="register-container">
    <br>
    <h1>Créer un compte</h1>
    <!-- Formulaire de création de compte -->
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <input v-model="username" placeholder="Nom" required /> <!-- Champ pour le nom d'utilisateur -->
      </div>
      <div class="form-group">
        <input v-model="email" placeholder="Email" required /> <!-- Champ pour l'email -->
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Mot de passe" required /> <!-- Champ pour le mot de passe -->
      </div>
      <button type="submit" :disabled="loading">Créer Utilisateur</button> <!-- Bouton de soumission -->
      <p v-if="error">{{ error.message }}</p> <!-- Affichage des erreurs -->
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'; // Importation de la fonction ref depuis Vue
import { useCreateUser } from '@/composables/useCreateUser'; // Importation du composable useCreateUser

export default {
  setup() {
    // Création de références réactives pour les champs du formulaire et les états
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const { createUser, loading, error } = useCreateUser();

    // Fonction pour soumettre le formulaire de création de compte
    const handleSubmit = async () => {
      const userData = { username: username.value, email: email.value, password: password.value };
      console.log('Données envoyées:', userData); // Affiche les données envoyées pour vérification
      await createUser(userData); // Appel de la fonction createUser pour créer un nouvel utilisateur
    };

    // Retourne les références et la fonction handleSubmit pour qu'elles puissent être utilisées dans le template
    return {
      username,
      email,
      password,
      handleSubmit,
      loading,
      error
    };
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
}

h1 {
  margin-bottom: 20px;
}

.register-form {
  width: 25%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
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
  color: red;
  text-align: center;
}
</style>
