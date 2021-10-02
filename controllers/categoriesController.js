import produits from "../models/produits";
import { include } from "underscore";
import Categories from "../models/categories";

const CategoriesController = {

    listerCategories: async(req, res) => {
        let results = await Categories.findAll({
            where: {
                status: 1
            }
        }).then((data) => {
            res.status(200).json({
                status: "200",
                "categories": data
            })
        }).catch(er => console.error(er));

    },

    modifierCategories: async(req, res) => {

        Categories.hasMany(produits, { foreignKey: "id" });
        produits.belongsTo(Categories, { foreignKey: "categories_id" });

        await Categories.findOne({
                where: {
                    id: req.params.CategoriesId,
                    produit_id: req.body.produit_id,
                },
                include: [{
                    model: Categories,
                    required: true,
                    as: 'categories'
                }, ],
            })
            .then(ncategorie => {
                if (ncategorie && ncategorie instanceof Categories) {
                    ncategorie = req.body
                    ncategorie.save()
                    res
                        .status(200)
                        .json({ status: 200, message: "Categorie modifié avec succès !" })
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
    },

};

export default CategoriesController;