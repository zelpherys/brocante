<template>
  <br />
  <div class="dashboard-container">
    <h2>Tableau de bord</h2>
    <p>Bienvenue, {{ user.username }}!</p>

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

    <button class="logout-button" @click="logout">Se déconnecter</button>
    <p v-if="error">{{ error }}</p>

    <h3>Vos articles</h3>
    <ul class="articles-list">
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCreateArticle } from "@/composables/useCreateArticle";
import { useReadArticles } from "@/composables/useReadArticles";
import { useUpdateArticle } from "@/composables/useUpdateArticle";
import { useDeleteArticle } from "@/composables/useDeleteArticle";
import CardComponent from "@/components/CardComponent.vue";

const user = ref(JSON.parse(localStorage.getItem("user")));

const { title, descriptif, prix, url, error, createArticle } =
  useCreateArticle();
const { userArticles, fetchUserArticles } = useReadArticles();
const { updateArticle } = useUpdateArticle();
const { deleteArticle: deleteArticleFunction } = useDeleteArticle();

const router = useRouter();
const isEditing = ref(false);
const editingArticleId = ref(null);

const createNewArticle = async () => {
  await createArticle(user.value.ID);
  fetchUserArticles(user.value.ID);
};

const editArticle = (article) => {
  isEditing.value = true;
  editingArticleId.value = article.id;
  title.value = article.title;
  descriptif.value = article.descriptif;
  prix.value = article.prix;
  url.value = article.url;
};

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

const deleteArticle = async (articleId) => {
  await deleteArticleFunction(articleId, user.value.ID);
  fetchUserArticles(user.value.ID);
};

const logout = () => {
  localStorage.removeItem("user");
  router.push("./connexion");
};

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
