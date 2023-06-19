import express from "express";
import {getAll, getOneById, create, updateById, deleteById} from '../src/controllers/planets'
const app = express();
const port = 3000;


app.use(express.json());

app.get("/getPlanets", getAll)

app.get("/getPlanets/:id", getOneById)

app.post("/addPlanet", create)

app.put("/editPlanet/:id", updateById)

app.delete("/deletePlanet/:id", deleteById)


app.listen(port, () => {
    console.log('server has started at port:', port, 'you can go to the link from here:', `http:localhost/${port}`)
})