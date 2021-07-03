import Panier from "../models/panier.model";
import Commande from "../models/commande.model";
import produits from "../models/produits";
import { include } from "underscore";

const panierController = {
  findOne: async (req, res) => {
    Commande.hasMany(Panier, { foreignKey: "id" });
    Panier.belongsTo(Commande, { foreignKey: "commande_id" });
    let panier = await Panier.findAll({
      where: {
        id: req.params.panierId,
      },
      include: [
        {
          model: Commande,
          required: true,
        },
      ],
    })
      .then((data) => {
        res.status(200).json({
          status: "200",
          panier: data
        });
      })
      .catch((error) => console.log(error));
  },
  create: async (req, res) => {
    Panier.Commande = Panier.hasMany(Commande);
    Commande.produits = Commande.hasMany(produits);
    await Panier.create(
      req.body,
      include[
        {
          association: Panier.Commande,
          include: [Commande.produits],
        }
      ]
    )
    .then((data) => {
      res.status(200).json({
        status: "200",
        Panier: data,
        message: "Panier enregistré",
      });
    })
    .catch((err) => console.log(err));
  },
  onEdit: async (req, res) => {

    Commande.hasMany(Panier, { foreignKey: "id" });
    Panier.belongsTo(Commande, { foreignKey: "commande_id" });

    await Panier.findOne({
      where: {
        id: req.params.panierId,
        client_id: req.body.client_id, 
        commande_id: req.body.commande_id 
      },
      include: [
        {
          model: Commande,
          required: true,
          as: 'commande'
        },
      ],
    })
    .then(npanier => {
      if(npanier && npanier instanceof Panier){
        npanier.commande.quantite = req.body.quantite ? req.body.quantite : 0
        npanier.save()
        
        res
        .status(200)
        .json({status: 200, message: "Pannier modifier avec succès !" })
      } else {
      res
        .status(404)
        .json({status: 404, message: "aucun resultat trouvé pour la modification !" })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({status: 500, message: error.hasOwnProperty('sqlMessage')  ? error['sqlMessage'] : "erreur inconnue du serveur !" })
    })
  }
};

export default panierController;
