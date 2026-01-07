const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Charge les variables du fichier .env
const connectDB = require('./config/Db');
const port = 3000;
const app = express();
 // Utilise le port du .env ou 3000 par défaut

// 1. Connexion à MongoDB
connectDB();

// 2. Middlewares globaux (Indispensables AVANT les routes)
app.use(cors()); // Autorise les requêtes depuis ton Frontend Next.js
app.use(express.json()); // Permet de lire les données JSON envoyées par Postman

// 3. Déclaration des Routes (Méthode identique à tes TP)
// Chaque ligne lie une URL à un fichier de routes spécifique
app.get('/api/test', (req, res) => {
  res.status(200).send('test réussi');
  
});
const UserRoutes = require('./routes/UserRoute');
app.use('/api/users', UserRoutes);
const productRoutes = require('./routes/ProductRoute');
app.use('/api/products', productRoutes);
const OrderRoutes = require('./routes/OrderRoute');
app.use('/api/orders', OrderRoutes);
const categoryRoutes = require('./routes/CategoryRoute');
app.use('/api/categories', categoryRoutes);
const ProfileRoute = require('./routes/ProfileRoute'); 
app.use('/api/profiles', ProfileRoute);                

// 4. Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur AgriMarket démarré sur http://localhost:${port}`);
});