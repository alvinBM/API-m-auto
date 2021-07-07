import Client from '../models/client.model'

const clientController = {
    onListing: async (req, res) => {
        await Client.findAll({
            where: {
                status: 1
            }
        })
        .then(clients => {
            if(clients)
                res
                  .status(200)
                  .json({status: 200, message: "status ok", content: clients})
            else 
                res
                  .status(404)
                  .json({status: 404, message: "aucune information trouvée"})                                                                                                                         
        })
        .catch(error => {
            if(error)
                res
                  .status(500)
                  .json({status: 500, message: "une erreur serveur vient de se produire !"})
        })
    },
    onEditing: async (req, res) => {
        const body = req.body;
        await Client.findOne({
            where: {
                id: req.params.clientId ? req.params.clientId : 0
            }
        })
        .then(client => {
            if(client && client instanceof Client){
                client.email = body.email ? body.email : client.email;
                client.nom = body.nom ? body.nom : client.nom;
                client.prenom = body.prenom ? body.prenom : client.prenom;
                client.telephone = body.telephone ? body.telephone : client.telephone;
                client.adresse = body.adresse ? body.adresse : client.adresse;
                client.save()
                res
                  .status(200)
                  .json({status: 200, message: "client modifier avec succès !"})
            }else 
                res
                  .status(404)
                  .json({status: 404, message: `Aucun client avec un id ${req.body.clientId} pour la modification !`})
        })
        .catch(error => {
            console.log(error)
            res
              .status(500)
              .json({status: 500, message: error})
        })
    }
}
export default clientController;