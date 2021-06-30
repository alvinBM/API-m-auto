import joi from 'joi';
import user from '../models/user';


const userValidation ={
    login:(req,res,next)=>{
        const schema=joi.object({
            phone:joi.string().min(10).required(),
            password:joi.string().min(3).required()
        });
        const {error}=schema.validate(req.body);
        if(error){
            return res.status(200).json({
                status:400,
                message:error.details[0].message
            });
        }
        next();
    },
    register:async (req,res,next)=>{
        const schema=joi.object({
            username:joi.string().min(3).max(50).required(),
            email:joi.string().min(3).max(50),
            phone: joi.string().min(10).required(),
            type : joi.number().required(),
            photo:joi.any(),
            password:joi.string().min(3).max(50).required(),
        });
        const {error} = schema.validate(req.body);
        if (error) {
            return res.status(200).json({
                status: 400,
                message: error.details[0].message
            });
        }
        const checkPhone = await user.findOne({
            where:{
                phone:req.body.phone
            }
        }).then().catch(er=>console.error(er));
        if(req.body.email){
            const checkEmail = await user.findOne({
                where:{
                    email:req.body.email
                }
            }).then().catch(er=>console.error(er));

            if(checkEmail){
                return res.status(200).json({
                    status: 400,
                    message: "cette email existe deja :("
                });
            }
        }
        if(checkPhone){
            return res.status(200).json({
                status: 400,
                message: "cet numero existe deja :("
            });
        }else {
            return next();
        }
    }
};

export default userValidation;