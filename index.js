import express from 'express';
import bodyparser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import routers from './routes/index';
import database from './config/database';
import dotenv from 'dotenv';
import cors from 'cors';
import docs from './swagger.json';
import path from "path";

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


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

let port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`server run on port::${port}`);
});