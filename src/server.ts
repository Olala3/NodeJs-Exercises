import express from "express";
import {getAll, getOneById, create, updateById, deleteById, updatePlanetImage} from '../src/controllers/planets'
import multer from 'multer';

require('dotenv').config();

const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;


app.use(express.json());

app.get("/getPlanets", getAll)

app.get("/getPlanets/:id", getOneById)

app.post("/addPlanet", create)

app.put("/editPlanet/:id", updateById)

app.delete("/deletePlanet/:id", deleteById)

app.post('/planets/:id/image', upload.single('image'), updatePlanetImage);



app.listen(port, () => {
    console.log('server has started at port:', port, 'you can go to the link from here:', `http:localhost/${port}`)
})