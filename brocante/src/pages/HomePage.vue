<script setup>
import CardComponent from "@/components/CardComponent.vue";
import { useArticles } from "@/composables/useArticles";

const { articles } = useArticles();
</script>

<template>
  <h1>Hello Brocante</h1>
  <div>
    <header>
      <h1>Filtrer Par:</h1>
      <div class="categories">
        <button>Équipement audio</button>
        <button>Cuivres</button>
        <button>Batteries</button>
        <button>Prix</button>
      </div>
    </header>

    <main>
      <div class="products-grid">
        <!-- Affichage des articles -->
        <CardComponent
          v-for="article in articles"
          :key="article.id"
          :article="article"
          :isClickable="true"
          :showEditButton="false"
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
