<template>
  <br />
  <div class="dashboard-container">
    <h2>Tableau de bord</h2>
    <p>Bienvenue, {{ user.username }}!</p>

    <!-- Formulaire pour créer ou modifier un article -->
    <form
      class="create-article-form"
      @submit.prevent="isEditing ? updateExistingArticle() : createNewArticle()"
    >
      <div class="form-group">
        <label for="title">Titre:</label>
        <input type="text" v-model="title" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea v-model="descriptif" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Prix:</label>
        <input type="number" v-model="prix" required />
      </div>
      <div class="form-group">
        <label for="imageUrl">URL de l'image:</label>
        <input type="text" v-model="url" required />
      </div>
      <button type="submit">
        {{ isEditing ? "Modifier l'article" : "Créer un article" }}
      </button>
    </form>

    <!-- Bouton pour se déconnecter -->
    <button class="logout-button" @click="logout">Se déconnecter</button>
    <p v-if="error">{{ error }}</p>

    <h3>Vos articles</h3>
    <ul class="articles-list">
      <!-- Composant pour afficher les articles de l'utilisateur -->
      <CardComponent
        v-for="article in userArticles"
        :key="article.id"
        :article="article"
        :isClickable="true"
        @editArticle="editArticle"
        @deleteArticle="deleteArticle"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Importation des fonctions ref et onMounted depuis Vue
import { useRouter } from "vue-router"; // Importation de useRouter pour la navigation
import { useCreateArticle } from "@/composables/useCreateArticle"; // Importation du composable pour créer un article
import { useReadArticles } from "@/composables/useReadArticles"; // Importation du composable pour lire les articles
import { useUpdateArticle } from "@/composables/useUpdateArticle"; // Importation du composable pour mettre à jour un article
import { useDeleteArticle } from "@/composables/useDeleteArticle"; // Importation du composable pour supprimer un article
import CardComponent from "@/components/CardComponent.vue"; // Importation du composant pour afficher les articles

// Récupération des informations de l'utilisateur depuis le localStorage
const user = ref(JSON.parse(localStorage.getItem("user")));

// Utilisation des composables pour gérer les articles
const { title, descriptif, prix, url, error, createArticle } = useCreateArticle();
const { userArticles, fetchUserArticles } = useReadArticles();
const { updateArticle } = useUpdateArticle();
const { deleteArticle: deleteArticleFunction } = useDeleteArticle();

const router = useRouter(); // Initialisation du routeur
const isEditing = ref(false); // État pour savoir si on est en mode édition
const editingArticleId = ref(null); // ID de l'article en cours d'édition

// Fonction pour créer un nouvel article
const createNewArticle = async () => {
  await createArticle(user.value.ID);
  fetchUserArticles(user.value.ID);
};

// Fonction pour éditer un article
const editArticle = (article) => {
  isEditing.value = true;
  editingArticleId.value = article.id;
  title.value = article.title;
  descriptif.value = article.descriptif;
  prix.value = article.prix;
  url.value = article.url;
};

// Fonction pour mettre à jour un article existant
const updateExistingArticle = async () => {
  const updatedArticle = {
    title: title.value,
    descriptif: descriptif.value,
    prix: prix.value,
    url: url.value,
    user_id: user.value.ID,
  };
  await updateArticle(editingArticleId.value, updatedArticle);
  fetchUserArticles(user.value.ID);
  isEditing.value = false;
  editingArticleId.value = null;
};

// Fonction pour supprimer un article
const deleteArticle = async (articleId) => {
  await deleteArticleFunction(articleId, user.value.ID);
  fetchUserArticles(user.value.ID);
};

// Fonction pour se déconnecter
const logout = () => {
  localStorage.removeItem("user");
  router.push("./connexion");
};

// Récupération des articles de l'utilisateur lors du montage du composant
onMounted(() => {
  fetchUserArticles(user.value.ID);
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
  margin-top: 10px;
  padding: 5px px;
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
  width: 50%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 15%;
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
  width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.article-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
