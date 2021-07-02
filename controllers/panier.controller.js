import Panier from "../models/panier.model";
import Commande from "../models/commande.model";

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
};

export default panierController;
