import Panier from "../models/panier.model";
import Commande from "../models/commande.model";
import produits from "../models/produits";

const panierController = {
  findOne: async (req, res) => {
    Panier.hasMany(Commande, { foreignKey: "panier_id" });
    Commande.belongsTo(Panier, {foreignKey:"id"})
    let panier = await Panier.findOne({
      where: {
        id: req.params.panierId,
      },
      include: [
        {
          model: Commande,
          required: true,
        }
      ]
    })
      .then((data) => {
        res.status(200).json({
          status: "200",
          panier: data
        });
      })
      .catch((error) => {
        console.log(error)
        res.status(404).json({
          status: "404",
          description: "Une erreur est survenu" + error
        });
      });
  },
  create: async (req, res) => {
    Panier.commande = Panier.hasMany(Commande, { foreignKey: "panier_id" });
    Commande.Panier = Commande.belongsTo(Panier, {foreignKey:"id"});
    
    await Panier.create(
      req.body,
      {
        include: Commande
      }
    )
    .then((data) => {
      res.status(200).json({
        status: "200",
        Panier: data,
        message: "Panier enregistré",
      });
    })
    .catch((err) => {
      console.log(err)
        res.status(404).json({
          status: "404",
          description: "Une erreur est survenu" + err
        });
    });
  },
  onEdit: async (req, res) => {

    Commande.hasMany(Panier, { foreignKey: "id" });
    Panier.belongsTo(Commande, { foreignKey: "commande_id" });

    await Panier.findOne({
      where: {
        id: req.params.panierId,
        client_id: req.body.client_id, 
        commande_id: req.body.commande_id,
        status: 1
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
      const body = req.body;
      if(npanier && npanier instanceof Panier){

        npanier.commande.client_id = body.client_id ? body.client_id : npanier.commande.client_id;
        npanier.commande.quantite = body.quantite ? body.quantite : npanier.commande.quantite;
        console.log(npanier.toJSON())
        
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
  },
  onDelete: async (req, res) => {
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
        npanier.status = 0;
        console.log(npanier.toJSON())
        // npanier.commande.
        npanier.save()
        res
        .status(200)
        .json({status: 200, message: "Pannier supprimé avec succès !" })
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
  },
  onSuccessDelivery: async (req, res) => {

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
        npanier.status = 2;  // signifie que la commande est validée
        // let pan = Panier.build(npanier.toJSON());
        console.log(npanier.toJSON())
        npanier.save();
        res
          .status(200)
          .json({status: 200, message: "livraison effectuée avec succès succès !" })
      } else {
      res
        .status(404)
        .json({status: 404, message: "aucun resultat trouvé pour la suppression !" })
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
