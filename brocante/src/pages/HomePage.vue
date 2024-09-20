<script setup>
import CardComponent from "@/components/CardComponent.vue"; // Importation du composant CardComponent
import { onMounted } from "vue"; // Importation de la fonction onMounted depuis Vue
import { useReadAllArticles } from "@/composables/useReadAllArticles"; // Importation du composable pour récupérer tous les articles

// Utiliser le composable pour récupérer tous les articles
const { allArticles, error, loading, fetchAllArticles } = useReadAllArticles();

// Récupérer les articles lors du montage du composant
onMounted(() => {
  fetchAllArticles();
});
</script>

<template>
  <h1>Hello Brocante</h1>
  <div>
    <!-- <header>
      <h1>Filtrer Par:</h1>
      <div class="categories">
        <button>Équipement audio</button>
        <button>Cuivres</button>
        <button>Batteries</button>
        <button>Prix</button>
      </div>
    </header> -->

    <main>
      <div v-if="loading">Chargement des articles...</div> <!-- Affichage du message de chargement -->
      <div v-if="error">{{ error }}</div> <!-- Affichage des erreurs -->

      <div v-if="allArticles.length && !loading" class="products-grid">
        <!-- Affichage des articles -->
        <CardComponent
          v-for="article in allArticles"
          :key="article.id"
          :article="article"
          :isClickable="true"
          :showEditButton="false"
          :isHomePage="true"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}

h1 {
  font-size: 24px;
}

.categories {
  margin-top: 10px;
}

.categories button {
  margin-right: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Grid layout for the products */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.products-grid > * {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
