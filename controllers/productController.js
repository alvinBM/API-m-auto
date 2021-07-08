import formatDate from 'date-format';
import produits from '../models/produits';
import dotenv from 'dotenv';
import base64ToImage from 'base64-to-image';
import path from "path";
import { Op } from 'sequelize';
import Categories from '../models/categories';

dotenv.config();

const productController = {


    modifierProduits: async(req, res) => {

        Produits.hasMany(Categories, { foreignKey: "id" });
        Categories.belongsTo(Produit, { foreignKey: "produits_id" });

        await Produits.findOne({
                where: {
                    id: req.params.ProduitsId,
                    categories_id: req.body.categories_id,
                },
                include: [{
                    model: Produits,
                    required: true,
                    as: 'Produits'
                }, ],
            })
            .then(mproduits => {
                if (mproduits && mproduits instanceof Produit) {
                    mproduits = req.body
                    mproduits.save()
                    res
                        .status(200)
                        .json({ status: 200, message: "Produit modifié avec succès !" })
                } else {
                    res
                        .status(404)
                        .json({ status: 404, message: "aucun resultat trouvé pour la modification !" })
                }
            })
            .catch(error => {
                res
                    .status(500)
                    .json({ status: 500, message: error.hasOwnProperty('sqlMessage') ? error['sqlMessage'] : "erreur inconnue du serveur !" })
            })
    }

};


export default productController;