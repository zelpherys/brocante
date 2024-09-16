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
  console.log('Données reçues pour la création d\'utilisateur:', req.body); // Afficher les données reçues

  // Requête pour insérer un nouvel utilisateur dans la base de données
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

// Route pour la connexion de l'utilisateur
app.post('/login', (req, res) => {
  const { nom, password } = req.body; // Récupérer 'nom' et 'password'
  
  // Requête pour trouver un utilisateur correspondant au nom fourni
  const query = 'SELECT * FROM user WHERE nom = ?';
  connection.query(query, [nom], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête de connexion:', err);
      res.status(500).send('Erreur lors de la connexion');
      return;
    }
    
    console.log('Résultats de la requête de connexion:', results); // Log des résultats

    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = results[0];

    // Comparer les mots de passe
    if (user.mdp === password) {
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: 'Mot de passe incorrect.' });
    }
  });
});

// Route pour créer un nouvel article
app.post('/articles', (req, res) => {
  const { title, description, price, imageUrl, user_id } = req.body;
  
  // Validation des champs requis
  if (!title || !description || !price || !user_id) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  // Requête pour insérer un nouvel article dans la base de données
  const query = 'INSERT INTO article (title, description, price, imageUrl, user_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, description, price, imageUrl, user_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de l\'article:', err);
      res.status(500).send('Erreur lors de la création de l\'article');
    } else {
      res.status(201).send('Article créé avec succès');
    }
  });
});

// Route pour obtenir tous les articles
app.get('/articles', (req, res) => {
  // Requête pour obtenir tous les articles de la base de données
  const query = 'SELECT * FROM article';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des articles:', err);
      res.status(500).send('Erreur lors de la récupération des articles');
    } else {
      res.status(200).json(results);
    }
  });
});

// Route pour obtenir un article spécifique par son ID
app.get('/articles/:id', (req, res) => {
  const { id } = req.params;

  // Requête pour obtenir un article spécifique de la base de données
  const query = 'SELECT * FROM article WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'article:', err);
      res.status(500).send('Erreur lors de la récupération de l\'article');
    } else if (results.length === 0) {
      res.status(404).send('Article non trouvé');
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Rediriger toutes les autres requêtes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
