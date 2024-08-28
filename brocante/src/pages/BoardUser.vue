<template>
  <br>
  <div class="dashboard-container">
    <!-- Titre de la page de tableau de bord -->
    <h2>Tableau de bord</h2>
    <!-- Message de bienvenue avec le nom de l'utilisateur -->
    <p>Bienvenue, {{ user.username }}!</p>
    <!-- Formulaire pour créer un article -->
    <form class="create-article-form" @submit.prevent="createNewArticle">
      <div class="form-group">
        <!-- Champ pour le titre de l'article -->
        <label for="title">Titre:</label>
        <input type="text" v-model="title" required />
      </div>
      <div class="form-group">
        <!-- Champ pour la description de l'article -->
        <label for="description">Description:</label>
        <textarea v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <!-- Champ pour le prix de l'article -->
        <label for="price">Prix:</label>
        <input type="number" v-model="price" required />
      </div>
      <div class="form-group">
        <!-- Champ pour l'URL de l'image de l'article -->
        <label for="imageUrl">URL de l'image:</label>
        <input type="text" v-model="imageUrl" required />
      </div>
      <!-- Bouton pour soumettre le formulaire de création d'article -->
      <button type="submit">Créer un article</button>
    </form>
    <!-- Bouton pour se déconnecter -->
    <button class="logout-button" @click="logout">Se déconnecter</button>
    <!-- Affichage d'un message d'erreur si une erreur survient -->
    <p v-if="error">{{ error }}</p>

    <!-- Liste des articles de l'utilisateur -->
    <h3>Vos articles</h3>
    <ul class="articles-list">
      <li v-for="article in userArticles" :key="article.id" class="article-card">
        <h4>{{ article.title }}</h4>
        <p>{{ article.description }}</p>
        <p>Prix: {{ article.price }} €</p>
        <img :src="article.imageUrl" alt="Image de l'article" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Importation de ref et onMounted pour la réactivité et les hooks de cycle de vie
import { useRouter } from 'vue-router'; // Importation du composable useRouter pour la navigation
import { useCreateArticle } from '@/composables/useCreateArticle'; // Importation du composable useCreateArticle
import { useReadArticles } from '@/composables/useReadArticles'; // Importation du composable useReadArticles

// Référence réactive pour stocker les informations de l'utilisateur connecté
const user = ref(JSON.parse(localStorage.getItem('user')));

// Utilisation du composable useCreateArticle pour obtenir les variables et fonctions nécessaires à la création d'articles
const { title, description, price, imageUrl, error, createArticle } = useCreateArticle(); // Suppression de la variable loading

// Utilisation du composable useReadArticles pour obtenir les variables et fonctions nécessaires à la lecture des articles
const { userArticles, fetchUserArticles } = useReadArticles();

const router = useRouter(); // Utilisation du composable useRouter pour la navigation

// Fonction pour gérer la création d'un nouvel article
const createNewArticle = async () => {
  await createArticle(user.value.id); // Appel de la fonction createArticle pour créer un nouvel article
  fetchUserArticles(user.value.id); // Récupération des articles de l'utilisateur après la création d'un nouvel article
};

// Fonction pour gérer la déconnexion de l'utilisateur
const logout = () => {
  localStorage.removeItem('user'); // Suppression des informations de l'utilisateur du localStorage
  router.push('/connexion'); // Redirection vers la page de connexion
};

// Hook de cycle de vie onMounted pour récupérer les articles de l'utilisateur lorsque le composant est monté
onMounted(() => {
  fetchUserArticles(user.value.id); // Appel de la fonction fetchUserArticles pour récupérer les articles de l'utilisateur
});
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.logout-button {
  margin-top: 10px; /* Espacement entre le formulaire et le bouton de déconnexion */
  padding: 5px px; /* Réduction de la taille du bouton */
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #ff1a1a;
}

h2 {
  margin-bottom: 20px;
}

.create-article-form {
  width: 50%; /* Réduction de la largeur */
  padding: 15px; /* Réduction du padding */
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px; /* Réduction de l'espacement */
}

.form-group {
  margin-bottom: 10px; /* Réduction de l'espacement */
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px; /* Réduction du padding */
  box-sizing: border-box;
}

button {
  width: 15%;
  padding: 10px; /* Réduction du padding */
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.articles-list {
  width: 80%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.article-card {
  width: 200px; /* Taille fixe pour les cartes */
  padding: 10px; /* Réduction du padding */
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.article-card img {
  width: 100%; /* Taille fixe pour les images */
  height: 150px; /* Taille fixe pour les images */
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
