import formatDate from 'date-format';
import categories from '../models/categories';
import dotenv from 'dotenv';
import base64ToImage from 'base64-to-image';
import path from "path";
import { json } from 'body-parser';

dotenv.config();

const categoriesController = {

    AjouterCategorie: async(req, res)=>{
        const result= await categories.create({
            nom:req.body.nom,
            description: req.body.description
        }).then((data) =>{
            if(data){
                res.send("Insert Success")
            }
            
        }).catch(err=> console.log(err));
    },

    SupprimerCategorie: async(req, res)=>{
        const result = await categories.destroy({
                where: {
                id: req.params.id
                }
            }).then((rowDeleted)=>{ 
                if(rowDeleted === 1){
                   res.send('Deleted successfully');
                 }
              }, (err)=>{
                  console.log(err); 
              });
    },

    selectCategorie: async(req, res)=>{
        let result = await categories.findAll().then((data)=>{
            res.status(200).json({
                status: "200",
                "categories": data
            }).catch(err=> console.log(err))
        })
    }

}


export default categoriesController;

