<template>
  <!-- Conteneur principal pour le tableau de bord -->
  <br>
  <div class="dashboard-container">
    <!-- Titre de la page du tableau de bord -->
    <h2>Tableau de bord</h2>
    <!-- Message de bienvenue personnalisé avec le nom de l'utilisateur -->
    <p>Bienvenue, {{ user?.username }}!</p>
    <!-- Formulaire pour créer un nouvel article -->
    <form class="create-article-form" @submit.prevent="createNewArticle">
      <!-- Champ pour le titre de l'article -->
      <div class="form-group">
        <label for="title">Titre:</label>
        <input type="text" v-model="title" required />
      </div>
      <!-- Champ pour la description de l'article -->
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="description" required></textarea>
      </div>
      <!-- Champ pour le prix de l'article -->
      <div class="form-group">
        <label for="price">Prix:</label>
        <input type="number" v-model="price" required />
      </div>
      <!-- Champ pour l'URL de l'image de l'article -->
      <div class="form-group">
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
      <!-- Utilisation de v-for pour parcourir et afficher chaque article de l'utilisateur -->
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
import { useCreateArticle } from '@/composables/useCreateArticle'; // Importation du composable personnalisé useCreateArticle
import { useReadArticles } from '@/composables/useReadArticles'; // Importation du composable personnalisé useReadArticles
import { useAuthStore } from '@/stores/authStore'; // Importation du store d'authentification

// Utilisation du store d'authentification pour accéder à l'utilisateur connecté
const authStore = useAuthStore();
const router = useRouter(); // Initialisation du routeur pour la navigation entre les pages

// Référence réactive pour stocker les informations de l'utilisateur connecté
const user = ref(authStore.user);

// Utilisation du composable useCreateArticle pour obtenir les variables et fonctions nécessaires à la création d'articles
const { title, description, price, imageUrl, error, createArticle } = useCreateArticle();

// Utilisation du composable useReadArticles pour obtenir les variables et fonctions nécessaires à la lecture des articles
const { userArticles, fetchUserArticles } = useReadArticles();

// Fonction pour gérer la création d'un nouvel article
const createNewArticle = async () => {
  await createArticle(user.value.id); // Appel de la fonction createArticle pour créer un nouvel article
  fetchUserArticles(user.value.id); // Récupération des articles de l'utilisateur après la création d'un nouvel article
};

// Fonction pour gérer la déconnexion de l'utilisateur
const logout = () => {
  authStore.logout(); // Appel de la fonction logout du store pour déconnecter l'utilisateur
  router.push('/connexion'); // Redirection vers la page de connexion après la déconnexion
};

// Hook de cycle de vie onMounted pour récupérer les articles de l'utilisateur lorsque le composant est monté
onMounted(() => {
  if (user.value) { // Vérification si un utilisateur est connecté
    fetchUserArticles(user.value.id); // Récupération des articles de l'utilisateur connecté
  } else {
    router.push('/connexion'); // Redirection vers la page de connexion si aucun utilisateur n'est connecté
  }
});
</script>

<style scoped>
/* Style du conteneur principal du tableau de bord */
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh; /* Assure que le conteneur prend toute la hauteur de la fenêtre */
}

/* Style du bouton de déconnexion */
.logout-button {
  margin-top: 10px; /* Espacement entre le formulaire et le bouton de déconnexion */
  padding: 5px; /* Réduction de la taille du bouton */
  background-color: #ff4d4d; /* Couleur de fond du bouton */
  color: #fff; /* Couleur du texte du bouton */
  border: none; /* Suppression des bordures du bouton */
  border-radius: 4px; /* Coins arrondis pour le bouton */
  cursor: pointer; /* Change le curseur à une main lorsqu'on survole le bouton */
}

/* Effet de survol pour le bouton de déconnexion */
.logout-button:hover {
  background-color: #ff1a1a; /* Couleur de fond plus sombre au survol */
}

/* Style du titre principal */
h2 {
  margin-bottom: 20px; /* Espacement sous le titre */
}

/* Style du formulaire de création d'article */
.create-article-form {
  width: 50%; /* Largeur du formulaire */
  padding: 15px; /* Espacement interne du formulaire */
  border: 1px solid #ccc; /* Bordure grise autour du formulaire */
  border-radius: 8px; /* Coins arrondis pour le formulaire */
  background-color: #fff; /* Couleur de fond blanche pour le formulaire */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Ombre légère sous le formulaire */
  margin-bottom: 10px; /* Espacement sous le formulaire */
}

/* Style de chaque groupe de champ dans le formulaire */
.form-group {
  margin-bottom: 10px; /* Espacement sous chaque groupe de champ */
}

/* Style pour les labels des champs */
label {
  display: block; /* Affichage en bloc pour que le label prenne toute la largeur disponible */
  margin-bottom: 5px; /* Espacement sous le label */
}

/* Style pour les champs de saisie et les zones de texte */
input, textarea {
  width: 100%; /* Champs prennent toute la largeur du conteneur parent */
  padding: 8px; /* Espacement interne des champs */
  box-sizing: border-box; /* Inclut le padding et la bordure dans la largeur totale des champs */
}

/* Style général des boutons */
button {
  width: 15%; /* Largeur des boutons */
  padding: 10px; /* Espacement interne des boutons */
  background-color: #007bff; /* Couleur de fond des boutons */
  color: #fff; /* Couleur du texte des boutons */
  border: none; /* Suppression des bordures des boutons */
  border-radius: 4px; /* Coins arrondis pour les boutons */
  cursor: pointer; /* Change le curseur à une main lorsqu'on survole le bouton */
}

/* Effet de survol pour les boutons */
button:hover {
  background-color: #0056b3; /* Couleur de fond plus sombre au survol */
}

/* Style pour la liste des articles */
.articles-list {
  width: 80%; /* Largeur de la liste */
  list-style: none; /* Suppression des puces de liste */
  padding: 0; /* Suppression du padding par défaut */
  display: flex; /* Affichage en Flexbox pour aligner les articles horizontalement */
  flex-wrap: wrap; /* Permet d'aller à la ligne lorsque la liste d'articles dépasse la largeur disponible */
  gap: 20px; /* Espacement entre les articles */
  justify-content: center; /* Centrer les articles horizontalement */
}

/* Style pour chaque carte d'article */
.article-card {
  width: 200px; /* Largeur fixe pour les cartes */
  padding: 10px; /* Espacement interne des cartes */
  border: 1px solid #ccc; /* Bordure grise autour des cartes */
  border-radius: 8px; /* Coins arrondis pour les cartes */
  background-color: #fff; /* Couleur de fond blanche pour les cartes */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Ombre légère sous les cartes */
  text-align: center; /* Centre le texte à l'intérieur des cartes */
}

/* Style pour les images d'articles */
.article-card img {
  width: 100%; /* L'image prend toute la largeur de la carte */
  height: 150px; /* Hauteur fixe pour les images */
  object-fit: cover; /* Couvre l'image tout en conservant ses proportions */
  border-radius: 4px; /* Coins arrondis pour les images */
  margin-bottom: 10px; /* Espacement sous l'image */
}
</style>
