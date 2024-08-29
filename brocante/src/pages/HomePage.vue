<script setup>
import CardComponent from "@/component/CardComponent.vue";
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

        <!-- Ajoutez les autres catégories ici -->
      </div>
    </header>

    <main>
      <div class="products-grid">
        <!-- Exemple de produit -->
        <CardComponent
          v-for="article in articles"
          v-bind:key="article.id"
          v-bind:article="article"
        />
        <!-- Répétez pour les autres produits -->
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
.products-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
</style>
