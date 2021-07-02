import Panier from "../models/panier.model";
import Commande from "../models/commande.model";
import produits from "../models/produits";
import { include } from "underscore";

const commandeController = {
  create: async (req, res) => {
    Commande.produits = Commande.hasMany(produits);
    await Commande.create(
      req.body,
      include[
        {
          model: Commande,
          required: true,
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

export default commandeController;
