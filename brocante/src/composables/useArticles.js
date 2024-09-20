import { onMounted, ref } from "vue"; // Importation des fonctions onMounted et ref depuis Vue

// Déclaration d'un composable nommé useArticles
export const useArticles = () => {
  // Création d'une référence réactive pour stocker les articles
  const articles = ref([]);

  // Utilisation du hook onMounted pour exécuter du code après que le composant soit monté
  onMounted(async () => {
    // Envoi d'une requête pour récupérer les articles depuis le serveur local
    const response = await fetch("http://localhost:3000/articles");
    // Mise à jour de la valeur de la référence articles avec les données JSON récupérées
    articles.value = await response.json();
  });

  // Retourne la référence articles pour qu'elle puisse être utilisée dans les composants
  return { articles };
};
