<script setup></script>
<template>
  <nav class="navbar">
    <div class="navbar-container">
      <a href="#" class="brand-logo">La Brocante</a>
      <ul class="nav-links">
        <li><router-link to="./">Accueil</router-link></li>
        <li><router-link to="./create">Create user</router-link></li>
        <li><router-link to="./connexion">Connexion</router-link></li>
      </ul>
    </div>
  </nav>
</template>
<style scoped>
/* Styles pour la Navbar */
.navbar {
  background-color: #333;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 50px;
}

.brand-logo {
  color: white;
  font-size: 24px;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-links li {
  margin-left: 24px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #007bff;
}
</style>
