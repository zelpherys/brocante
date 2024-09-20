<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Variables réactives pour stocker l'article et l'utilisateur
const article = ref(null);
const user = ref(null);
const errorMessage = ref(""); // Pour afficher un message d'erreur en cas de problème

// Récupérer les paramètres de l'URL et initialiser le router pour la navigation
const route = useRoute();
const router = useRouter();

// Fonction pour récupérer l'article et l'utilisateur associé
const fetchArticleAndUser = async () => {
  try {
    // Récupérer l'article par son ID (extrait des paramètres d'URL)
    const articleResponse = await fetch(
      `http://localhost:3000/articles/${route.params.id}`
    );

    if (articleResponse.ok) {
      // Extraire les données de l'article
      article.value = await articleResponse.json();

      // Vérifier si l'article contient un user_id pour récupérer l'utilisateur
      if (article.value.user_id) {
        const userResponse = await fetch(
          `http://localhost:3000/users/${article.value.user_id}`
        );
        if (userResponse.ok) {
          // Extraire les données de l'utilisateur associé
          user.value = await userResponse.json();
        } else {
          errorMessage.value = "Utilisateur non trouvé.";
          console.error("Erreur lors de la récupération de l'utilisateur.");
        }
      }
    } else {
      errorMessage.value = "Article non trouvé.";
      console.error("Erreur lors de la récupération de l'article.");
      router.push("/"); // Redirection vers l'accueil si l'article n'est pas trouvé
    }
  } catch (error) {
    errorMessage.value =
      "Une erreur est survenue lors de la récupération des données.";
    console.error(error);
  }
};

// Fonction pour retourner à la page précédente
const goBack = () => {
  router.push("/");
};

// Charger les données lors du montage du composant
onMounted(() => {
  fetchArticleAndUser();
});
</script>

<template>
  <div class="article-detail">
    <!-- Affichage d'un message d'erreur s'il y a un problème -->
    <div v-if="errorMessage">{{ errorMessage }}</div>

    <!-- Affichage de l'article si les données sont chargées -->
    <div v-if="article">
      <h1>{{ article.title }}</h1>
      <img
        v-if="article.url"
        :src="article.url"
        :alt="article.descriptif"
        class="article-image"
      />
      <p class="article-price"><strong>Prix :</strong> {{ article.prix }} €</p>
      <p class="article-description">
        <strong>Description :</strong> {{ article.descriptif }}
      </p>

      <!-- Affichage de l'utilisateur associé si les données sont présentes -->
      <div v-if="user" class="article-user">
        <h3>Posté par : {{ user.nom }}</h3>
        <p>Email : {{ user.email }}</p>
        <button
          class="contact-button"
          @click="
            window.location.href = `mailto:${user.email}?subject=Question sur l'article: ${article.title}`
          "
        >
          Contacter le vendeur
        </button>
      </div>
    </div>

    <!-- Bouton pour revenir à la page précédente -->
    <div class="buttons">
      <button @click="goBack">Revenir à la page d'accueil</button>
    </div>
  </div>
</template>

<style scoped>
.article-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.article-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

.article-price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.article-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
}

.article-user {
  text-align: left;
}

.contact-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contact-button:hover {
  background-color: #218838;
}

.buttons {
  margin-top: 20px;
}

.buttons button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #0056b3;
}
</style>
