<script setup></script>
<template>
    <h1>Hello Brocante</h1>
    <div>
        <header>
        <h1>Acheter par catégorie</h1>
        <div class="categories">
            <button>Équipement audio</button>
            <button>Cuivres</button>
            <button>Batteries</button>
            <!-- Ajoutez les autres catégories ici -->
        </div>
    </header>

    <main>
        <div class="products-grid">
            <!-- Exemple de produit -->
            <div class="product-item">
                <img src="" alt="Zoom RFX-2000 rack effects">
                <p>175 $US</p>
                <p>Zoom RFX-2000 rack effects</p>
                <p>Myrtle Beach, SC</p>
            </div>
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

.product-item {
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.product-item img {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}
</style>