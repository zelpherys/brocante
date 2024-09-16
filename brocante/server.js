const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./config/db'); // Importer la connexion à la base de données

const app = express();

app.use(bodyParser.json());

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, 'dist')));

// Route pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
    const { username, email, password } = req.body; // Utiliser les bons champs
    console.log('Données reçues:', req.body); // Afficher les données reçues
    const query = 'INSERT INTO user (nom, email, mdp) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (err, results) => {
      if (err) {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        res.status(500).send('Erreur lors de la création de l\'utilisateur');
      } else {
        res.status(201).send('Utilisateur créé avec succès');
      }
    });
  });
   

// Rediriger toutes les requêtes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
