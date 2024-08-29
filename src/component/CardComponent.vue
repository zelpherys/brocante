<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const navigateToDetails = () => {
  router.push({ name: "ArticleDetail", params: { id: props.article.id } });
};
</script>

<template>
  <div class="product-item" @click="navigateToDetails" style="cursor: pointer">
    <img v-bind:src="article.imageUrl" :alt="article.description" />
    <p>{{ article.price }} €</p>
    <p>{{ article.title }}</p>
    <p>{{ article.description }}</p>
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
