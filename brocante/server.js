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
  const { username, email, password } = req.body;
  console.log('Données reçues pour la création d\'utilisateur:', req.body);

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
  const { nom, password } = req.body;
  
  const query = 'SELECT * FROM user WHERE nom = ?';
  connection.query(query, [nom], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête de connexion:', err);
      res.status(500).send('Erreur lors de la connexion');
      return;
    }
    
    console.log('Résultats de la requête de connexion:', results);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' });
    }

    const user = results[0];

    if (user.mdp === password) {
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: 'Mot de passe incorrect.' });
    }
  });
});

// Route pour créer un nouvel article
app.post('/articles', (req, res) => {
  const { title, descriptif, prix, url, user_id } = req.body;
  
  if (!title || !descriptif || !prix || !user_id) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const query = 'INSERT INTO article (title, descriptif, prix, url, user_id) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [title, descriptif, prix, url, user_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de l\'article:', err);
      res.status(500).send('Erreur lors de la création de l\'article');
    } else {
      res.status(201).send('Article créé avec succès');
    }
  });
});

// Route pour obtenir tous les articles de tous les utilisateurs (sans filtrer par userId)
app.get('/all-articles', (req, res) => {
  const query = 'SELECT * FROM article';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de tous les articles:', err);
      res.status(500).send('Erreur lors de la récupération des articles');
    } else {
      res.status(200).json(results);
    }
  });
});


// Route pour obtenir tous les articles de l'utilisateur
app.get('/articles', (req, res) => {
  const { userId } = req.query;

  const query = 'SELECT * FROM article WHERE user_id = ?';
  connection.query(query, [userId], (err, results) => {
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

// Route pour mettre à jour un article
app.put('/articles/:id', (req, res) => {
  const { id } = req.params;
  const { title, descriptif, prix, url } = req.body;

  if (!title || !descriptif || !prix) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const query = 'UPDATE article SET title = ?, descriptif = ?, prix = ?, url = ? WHERE id = ?';
  connection.query(query, [title, descriptif, prix, url, id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'article:', err);
      res.status(500).send('Erreur lors de la mise à jour de l\'article');
    } else {
      res.status(200).send('Article mis à jour avec succès');
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
