import express from 'express';
import cors from 'cors';
import { sample_products, sample_tags } from './data';

const app = express(); // Importation du module Express
app.use(cors({
    credentials: true, // Inclus les infos d'auth dans les requetes CORS
    origin: ["http://localhost:4200"]
})); // Configuration des CORS pour permettre les requêtes provenant de l'origine (4200), autorise l'accès aux ressources du serveur

// Route API de tous les produits
app.get("/api/produits", (req, res) => {
    res.send(sample_products);
})

// Route API pour la recherche des produits
app.get("/api/produits/recherche/:searchTerm", (req, res) => {
    // Extrait le terme de recherche 
    const searchTerm = req.params.searchTerm;

    // Filte des produits en fonction du terme de recherche, écrire 'chemi' me renverra le résulat du produit Chemise
    const products = sample_products
        .filter(product => product.name.toLowerCase()
        .includes(searchTerm.toLowerCase()));

    // Envoi des produits filtrés en réponse
    res.send(products);
})

// Route API de tous les tags
app.get("/api/produits/tags", (req, res) =>{
    res.send(sample_tags);
})

// Route des produits spécifique à leur tags associés 
app.get("/api/produits/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const products = sample_products
        .filter(product => product.tags?.includes(tagName));
        res.send(products);
})

// Route du single produit référé à son ID
app.get("/api/produit/:produitId", (req, res) =>{
    const productId = req.params.produitId;
    const product = sample_products.find(product => product.id == productId)
    res.send(product); // ENvois au client
})


// Port Serveur
const port = 5000;
app.listen(port, () => {
    console.log("Le site est hébergé sur http://localhost:" + port);
})