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
  <div class="product-item" @click="navigateToDetails">
    <img :src="article.imageUrl" :alt="article.description" />
    <p class="article-price">{{ article.price }} €</p>
    <p class="article-title">{{ article.title }}</p>
    <p class="article-description">{{ article.description }}</p>
  </div>
</template>

<style scoped>
.product-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 200px;
  height: 350px; /* Uniform height */
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.product-item:hover {
  transform: translateY(-5px);
}

.product-item img {
  width: 100%;
  height: 150px; /* Fixed height for images */
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.article-price {
  font-weight: bold;
  margin-bottom: 5px;
}

.article-title {
  font-size: 16px;
  margin-bottom: 5px;
}

.article-description {
  font-size: 14px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Truncate text */
}
</style>
