<script setup>
import CardComponent from "@/component/CardComponent.vue";
import { ref } from "vue";

const produits = ref([
  {
    id: "1",
    title: "vente de violon",
    description: "blablablabla",
    price: 750,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Old_violin.jpg/280px-Old_violin.jpg",
    userId: "1",
  },
  {
    id: "2",
    title: "guitaar",
    description: "blablabla",
    price: 1500,
    imageUrl:
      "https://www.midimusic.fr/1310-large_default/epiphone-guitare-electrique-sg-standard-cherry-gaucher.jpg",
    userId: "1",
  },
  {
    id: "3",
    title: "tambour",
    description: "zaeaeaeaze",
    price: 500,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/eb/M0354_1951-15-077_1.jpg",
    userId: "1",
  },
  {
    id: "4",
    title: "piano",
    description: "dfdsfhdslfkdlkfjsdf",
    price: 250000,
    imageUrl: "https://www.musique-galland.fr/medias/images/c3xa.jpg",
    userId: "1",
  },
  {
    id: 5,
    title: "test",
    description: "test",
    price: 55,
    imageUrl:
      "https://emisb.sisteronais-buech.fr/wp-content/uploads/sites/2/2019/08/Copie-de-contenus-types11.png",
    userId: "1",
  },
  {
    id: 6,
    title: "test",
    description: "test",
    price: 555,
    imageUrl:
      "https://www.jeuxetcompagnie.fr/wp-content/uploads/2014/01/coloriage-instrument-de-musique.jpg",
    userId: "1",
  },
  {
    id: 7,
    title: "test",
    description: "test",
    price: 555,
    imageUrl:
      "https://www.jeuxetcompagnie.fr/wp-content/uploads/2014/01/coloriage-instrument-de-musique.jpg",
    userId: "1",
  },
  {
    id: 8,
    title: "test",
    description: "test",
    price: 555,
    imageUrl:
      "https://www.jeuxetcompagnie.fr/wp-content/uploads/2014/01/coloriage-instrument-de-musique.jpg",
    userId: "1",
  },
  {
    id: 9,
    title: "test",
    description: "test",
    price: 555,
    imageUrl:
      "https://www.jeuxetcompagnie.fr/wp-content/uploads/2014/01/coloriage-instrument-de-musique.jpg",
    userId: "1",
  },
  {
    id: 10,
    title: "flute",
    description: "flute blablalba",
    price: 360,
    imageUrl: "https://www.bax-shop.fr/images/keuzehulp_blokfluit_01.jpg",
    userId: "1",
  },
]);
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
          v-for="produit in produits"
          v-bind:key="produit.id"
          v-bind:produit="produit"
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
