<script setup>
import { useAuthStore } from "@/stores/authStore"; // Importation du store d'authentification Pinia
import { computed, onMounted, onUnmounted } from "vue"; // Importation des fonctions utilitaires de Vue pour la réactivité et les hooks de cycle de vie

// Initialisation du store d'authentification
const authStore = useAuthStore(); // Utilisation du store d'authentification pour accéder à l'état global de l'application
const isLoggedIn = computed(() => authStore.isLoggedIn); // Création d'une propriété réactive calculée pour déterminer si l'utilisateur est connecté

// Fonction pour gérer les changements dans le stockage local (localStorage)
const handleStorageChange = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Récupération de l'utilisateur stocké dans le localStorage et conversion en objet JavaScript
  if (user) {
    authStore.login(user); // Si un utilisateur est trouvé dans le localStorage, déclencher la fonction de connexion du store avec les données de l'utilisateur
  } else {
    authStore.logout(); // Sinon, si aucun utilisateur n'est trouvé, déclencher la fonction de déconnexion du store
  }
};

// Hook de cycle de vie de Vue qui s'exécute lorsque le composant est monté sur le DOM
onMounted(() => {
  window.addEventListener("storage", handleStorageChange); // Ajouter un écouteur d'événement pour détecter les changements dans le localStorage et synchroniser l'état d'authentification
});

// Hook de cycle de vie de Vue qui s'exécute lorsque le composant est démonté du DOM
onUnmounted(() => {
  window.removeEventListener("storage", handleStorageChange); // Supprimer l'écouteur d'événement pour éviter les fuites de mémoire lorsque le composant est démonté
});
</script>
<template>
  <!-- Début du bloc de template de la barre de navigation -->
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo ou nom de la marque, cliquable pour retourner à l'accueil -->
      <a href="#" class="brand-logo">La Brocante</a>
      <!-- Liste des liens de navigation -->
      <ul class="nav-links">
        <!-- Lien vers la page d'accueil -->
        <li><router-link to="/">Accueil</router-link></li>
        <!-- Lien vers la page de création d'un utilisateur -->
        <!-- Afficher le lien d'inscription seulement si l'utilisateur n'est pas connecté -->
        <li v-if="!isLoggedIn">
          <router-link to="./create">Inscription</router-link>
        </li>
        <!-- Affichage conditionnel des liens de navigation selon l'état de connexion de l'utilisateur -->
        <!-- Si l'utilisateur n'est pas connecté, afficher le lien de connexion -->
        <li v-if="!isLoggedIn">
          <router-link to="./connexion">Connexion</router-link>
        </li>
        <!-- Si l'utilisateur est connecté, afficher le lien vers le tableau de bord -->
        <li v-else><router-link to="./board">Dashboard</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Style de base pour la barre de navigation */
.navbar {
  background-color: #333; /* Couleur de fond de la navbar */
  padding: 10px 20px; /* Espacement interne (padding) autour du contenu de la navbar */
  position: fixed; /* Fixe la position de la navbar en haut de la page, même lors du défilement */
  width: 100%; /* Prend toute la largeur de la fenêtre */
  top: 0; /* Positionné en haut de la fenêtre */
  left: 0; /* Aligné à gauche de la fenêtre */
  z-index: 1000; /* Priorité d'affichage haute pour être au-dessus d'autres éléments */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre sous la navbar pour donner une impression de profondeur */
}

/* Conteneur principal de la navbar, utilisé pour aligner le contenu */
.navbar-container {
  display: flex; /* Utilisation de Flexbox pour disposer les éléments horizontalement */
  justify-content: space-between; /* Espace entre les éléments pour les pousser aux extrémités */
  align-items: center; /* Centrage vertical des éléments */
  margin-right: 50px; /* Espacement à droite du conteneur */
}

/* Style du logo de la marque */
.brand-logo {
  color: white; /* Couleur du texte du logo */
  font-size: 24px; /* Taille de la police pour le logo */
  text-decoration: none; /* Suppression de la décoration de texte (soulignement) */
}

/* Style de la liste des liens de navigation */
.nav-links {
  list-style: none; /* Suppression des puces de liste */
  margin: 0; /* Suppression des marges autour de la liste */
  padding: 0; /* Suppression du padding interne de la liste */
  display: flex; /* Utilisation de Flexbox pour disposer les éléments horizontalement */
}

/* Style de chaque élément de liste */
.nav-links li {
  margin-left: 24px; /* Espacement entre chaque lien */
}

/* Style de chaque lien de navigation */
.nav-links a {
  color: white; /* Couleur du texte des liens */
  text-decoration: none; /* Suppression de la décoration de texte (soulignement) */
  font-size: 16px; /* Taille de la police pour les liens */
  transition: color 0.3s; /* Transition douce de la couleur du lien lors du survol */
}

/* Style de survol pour chaque lien de navigation */
.nav-links a:hover {
  color: #007bff; /* Couleur de survol pour les liens */
}
</style>
