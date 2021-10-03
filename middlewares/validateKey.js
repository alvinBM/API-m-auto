import dotenv from 'dotenv';

dotenv.config();

const validateKey = async (req, res, next) => {

    const key = req.headers.key;
    const app = req.headers.app;

    if (key && app) {
        if (app == process.env.ACESS_APP && key == process.env.ACESS_KEY) {
            return next();
        }        
    }
    res.status(200).json({
        status: 404,
        message: "Wrong Access key, please check your access key"
    });
};
export default validateKey;