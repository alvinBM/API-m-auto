import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routers from './routes/index';
import database from './config/database';
import dotenv from 'dotenv';
import cors from 'cors';
import UploadedFile from 'express-fileupload';
import docs from './swagger.json';
import path from "path";


dotenv.config();

const app = express();

app.use(cors())
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(UploadedFile());
app.use("/api", routers);

app.get('/', (req, res, next) => {
    res.status(200).send({
        status : 200,
        message : 'Welcome to M AUTO API'});
});


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//intialize endpoint of api documatation  of vesrion 1
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
// read file 
app.get('/api/ressources/:ressource', (req, res, next) => {
  const rss = (req.params['ressource']);
  res
      .status(200)
      .sendFile(path.resolve(`assets/categimages/${rss}`));
  // next();
})
app.use('**', (req, res, next) => {
    res.status(200).send({status : 405, message : 'Resource requested not found on the server'})
});

// database connexion test
const testDbConnexion = async() =>{
    try {
      await database.authenticate();
      console.log('Database Successfully Connected');
    } catch (error) {
       console.error('DB Error ',error);
    }
  };

  testDbConnexion();

let port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server run on port::${port}`);
});