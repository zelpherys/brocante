const express = require('express');
const bodyParser = require('body-parser');
const db = require('../brocante/config/db'); // Assurez-vous que ce chemin est correct

const app = express();
app.use(bodyParser.json());

app.post('/users', (req, res) => {
  const { nom, email } = req.body;
  const sql = 'INSERT INTO user (nom, email) VALUES (?, ?)';
  db.query(sql, [nom, email], (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la création de l\'utilisateur');
    } else {
      res.send({ id: result.insertId, nom, email });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
