<template>
    <div>
        <br>
        <h1> Créer un compte</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="username" placeholder="Pseudo" />
        <input v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Mot de passe" />
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
  