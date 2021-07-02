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
          panier: data,
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
          message: "Panier enregistrer",
        });
      })
      .catch((err) => console.log(err));
  },
};

export default panierController;
