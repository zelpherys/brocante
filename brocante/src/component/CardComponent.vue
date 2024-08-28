<script setup>
import { defineProps } from "vue";
defineProps({
  produit: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="product-item">
    <img v-bind:src="produit.imageUrl" :alt="produit.description" />
    <p>{{ produit.price }} €</p>
    <p>{{ produit.title }}</p>
    <p>{{ produit.description }}</p>
  </div>
</template>

<style scoped>
.product-item {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-item img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
</style>
