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
                <img src="data:image/jpeg;base64,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" alt="Zoom RFX-2000 rack effects">
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