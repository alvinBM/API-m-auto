import Client from '../models/client.model'
const clientController = {
    onListing: async (req, res) => {
        await Client.findAll({

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

    }
}
export default clientController;