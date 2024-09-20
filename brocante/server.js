const express = require('express'); // Importation du framework Express
const path = require('path'); // Importation du module path pour travailler avec les chemins de fichiers
const bodyParser = require('body-parser'); // Importation du middleware body-parser pour parser les requêtes HTTP
const connection = require('./config/db'); // Importation de la connexion à la base de données

const app = express(); // Création d'une instance de l'application Express

app.use(bodyParser.json()); // Utilisation du middleware body-parser pour parser les requêtes JSON

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, 'dist')));

// Route pour créer un nouvel utilisateur
app.post('/users', (req, res) => {
  const { username, email, password } = req.body; // Récupération des données de la requête
  console.log('Données reçues pour la création d\'utilisateur:', req.body);

  const query = 'INSERT INTO user (nom, email, mdp) VALUES (?, ?, ?)'; // Requête SQL pour insérer un nouvel utilisateur
  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de l\'utilisateur:', err);
      res.status(500).send('Erreur lors de la création de l\'utilisateur'); // Envoi d'une réponse d'erreur
    } else {
      res.status(201).send('Utilisateur créé avec succès'); // Envoi d'une réponse de succès
    }
  });
});

// Route pour la connexion de l'utilisateur
app.post('/login', (req, res) => {
  const { nom, password } = req.body; // Récupération des données de la requête
  
  const query = 'SELECT * FROM user WHERE nom = ?'; // Requête SQL pour sélectionner l'utilisateur par nom
  connection.query(query, [nom], (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête de connexion:', err);
      res.status(500).send('Erreur lors de la connexion'); // Envoi d'une réponse d'erreur
      return;
    }
    
    console.log('Résultats de la requête de connexion:', results);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé.' }); // Envoi d'une réponse si l'utilisateur n'est pas trouvé
    }

    const user = results[0];

    if (user.mdp === password) {
      res.status(200).json({ user }); // Envoi d'une réponse de succès avec les données de l'utilisateur
    } else {
      res.status(401).json({ message: 'Mot de passe incorrect.' }); // Envoi d'une réponse si le mot de passe est incorrect
    }
  });
});

// Route pour créer un nouvel article
app.post('/articles', (req, res) => {
  const { title, descriptif, prix, url, user_id } = req.body; // Récupération des données de la requête
  
  if (!title || !descriptif || !prix || !user_id) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' }); // Envoi d'une réponse si des champs sont manquants
  }

  const query = 'INSERT INTO article (title, descriptif, prix, url, user_id) VALUES (?, ?, ?, ?, ?)'; // Requête SQL pour insérer un nouvel article
  connection.query(query, [title, descriptif, prix, url, user_id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la création de l\'article:', err);
      res.status(500).send('Erreur lors de la création de l\'article'); // Envoi d'une réponse d'erreur
    } else {
      res.status(201).send('Article créé avec succès'); // Envoi d'une réponse de succès
    }
  });
});

// Route pour obtenir tous les articles de tous les utilisateurs (sans filtrer par userId)
app.get('/all-articles', (req, res) => {
  const query = 'SELECT * FROM article'; // Requête SQL pour sélectionner tous les articles
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de tous les articles:', err);
      res.status(500).send('Erreur lors de la récupération des articles'); // Envoi d'une réponse d'erreur
    } else {
      res.status(200).json(results); // Envoi des résultats sous forme de JSON
    }
  });
});

// Route pour obtenir tous les articles de l'utilisateur
app.get('/articles', (req, res) => {
  const { userId } = req.query; // Récupération de l'ID de l'utilisateur depuis les paramètres de requête

  const query = 'SELECT * FROM article WHERE user_id = ?'; // Requête SQL pour sélectionner les articles par user_id
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des articles:', err);
      res.status(500).send('Erreur lors de la récupération des articles'); // Envoi d'une réponse d'erreur
    } else {
      res.status(200).json(results); // Envoi des résultats sous forme de JSON
    }
  });
});

// Route pour obtenir un article spécifique par son ID
app.get('/articles/:id', (req, res) => {
  const { id } = req.params; // Récupération de l'ID de l'article depuis les paramètres de requête

  const query = 'SELECT * FROM article WHERE id = ?'; // Requête SQL pour sélectionner un article par ID
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'article:', err);
      res.status(500).send('Erreur lors de la récupération de l\'article'); // Envoi d'une réponse d'erreur
    } else if (results.length === 0) {
      res.status(404).send('Article non trouvé'); // Envoi d'une réponse si l'article n'est pas trouvé
    } else {
      res.status(200).json(results[0]); // Envoi des résultats sous forme de JSON
    }
  });
});

// Route pour mettre à jour un article
app.put('/articles/:id', (req, res) => {
  const { id } = req.params; // Récupération de l'ID de l'article depuis les paramètres de requête
  const { title, descriptif, prix, url } = req.body; // Récupération des données de la requête

  if (!title || !descriptif || !prix) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' }); // Envoi d'une réponse si des champs sont manquants
  }

  const query = 'UPDATE article SET title = ?, descriptif = ?, prix = ?, url = ? WHERE id = ?'; // Requête SQL pour mettre à jour un article
  connection.query(query, [title, descriptif, prix, url, id], (err, results) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'article:', err);
      res.status(500).send('Erreur lors de la mise à jour de l\'article'); // Envoi d'une réponse d'erreur
    } else {
      res.status(200).send('Article mis à jour avec succès'); // Envoi d'une réponse de succès
    }
  });
});

// Route pour supprimer un article
app.delete('/articles/:id', (req, res) => {
  const { id } = req.params; // Récupération de l'ID de l'article depuis les paramètres de requête
  const { userId } = req.body; // Récupération de l'ID de l'utilisateur depuis le corps de la requête

  const query = 'DELETE FROM article WHERE id = ? AND user_id = ?'; // Requête SQL pour supprimer un article
  connection.query(query, [id, userId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'article:', err);
      res.status(500).send('Erreur lors de la suppression de l\'article'); // Envoi d'une réponse d'erreur
    } else if (results.affectedRows === 0) {
      res.status(404).send('Article non trouvé ou vous n\'êtes pas autorisé à le supprimer'); // Envoi d'une réponse si l'article n'est pas trouvé ou si l'utilisateur n'est pas autorisé à le supprimer
    } else {
      res.status(200).send('Article supprimé avec succès'); // Envoi d'une réponse de succès
    }
  });
});

// Rediriger toutes les autres requêtes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // Envoi du fichier index.html pour toutes les autres requêtes
});

const port = process.env.PORT || 3000; // Définition du port d'écoute
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`); // Message de confirmation que le serveur est en écoute
});
