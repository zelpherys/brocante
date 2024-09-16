<template>
  <div class="register-container">
    <br>
    <h1>Créer un compte</h1>
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-group">
        <input v-model="username" placeholder="Nom" required />
      </div>
      <div class="form-group">
        <input v-model="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Mot de passe" required />
      </div>
      <button type="submit" :disabled="loading">Créer Utilisateur</button>
      <p v-if="error">{{ error.message }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useCreateUser } from '@/composables/useCreateUser';

export default {
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const { createUser, loading, error } = useCreateUser();

    const handleSubmit = async () => {
      const userData = { username: username.value, email: email.value, password: password.value };
      console.log('Données envoyées:', userData); // Afficher les données envoyées
      await createUser(userData);
    };

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
