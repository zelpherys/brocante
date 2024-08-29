<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const article = ref(null);

onMounted(async () => {
  const response = await fetch(
    `http://localhost:3000/articles/${route.params.id}`
  );
  if (response.ok) {
    article.value = await response.json();
  } else {
    // Gestion de l'erreur si l'article n'est pas trouvé
    router.push("/"); // Retourne à la page d'accueil si l'article n'est pas trouvé
  }
});

const goBack = () => {
  router.push("/");
};
</script>

<template>
  <div class="article-detail" v-if="article">
    <h1>{{ article.title }}</h1>
    <img
      :src="article.imageUrl"
      :alt="article.description"
      class="article-image"
    />
    <p class="article-price">Prix: {{ article.price }} €</p>
    <p class="article-description">{{ article.description }}</p>

    <div class="buttons">
      <button @click="goBack">Revenir à la page d'accueil</button>
    </div>
  </div>
  <div v-else>
    <p>Chargement...</p>
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.article-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
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
