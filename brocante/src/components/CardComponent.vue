<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
  isClickable: {
    type: Boolean,
    default: true,
  },
  showEditButton: {
    type: Boolean,
    default: true,
  },
  isHomePage: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["editArticle", "deleteArticle"]);

const router = useRouter();

const triggerEdit = () => {
  emits("editArticle", props.article);
};

const triggerDelete = () => {
  emits("deleteArticle", props.article.id);
};

const navigateToDetails = () => {
  if (props.isClickable) {
    router.push({ name: "ArticleDetail", params: { id: props.article.id } });
  }
};
</script>

<template>
  <div class="product-item" @click="navigateToDetails">
    <p class="article-title">{{ article.title }}</p>
    <img :src="article.url" :alt="article.descriptif" />
    <p class="article-description">{{ article.descriptif }}</p>
    <p class="article-price">{{ article.prix }} €</p>
    <button v-if="showEditButton" @click.stop="triggerEdit" class="edit-button">
      Modifier
    </button>
    <button v-if="!isHomePage" @click.stop="triggerDelete" class="delete-button">
      Supprimer
    </button>
  </div>
</template>

<style scoped>
.product-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 200px;
  height: 350px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.product-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.article-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.article-description {
  font-size: 14px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 5px;
}

.article-price {
  font-weight: bold;
  margin-bottom: 5px;
}

.edit-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.edit-button:hover {
  background-color: #0056b3;
}

.delete-button {
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.delete-button:hover {
  background-color: #ff1a1a;
}
</style>
