import { onMounted, ref } from "vue";

export const useArticles = () => {
  const articles = ref([]);

  onMounted(async () => {
    const response = await fetch("http://localhost:3000/articles");
    articles.value = await response.json();
  });

  return { articles };
};
