import express, {Request, Response} from "express";
const app = express();
const port = 3000;


app.use(express.json());

type Planet = {
    id: number,
    name: string,
  };

type Planets = Planet[];

let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

app.get("/getPlanets", (req: Request, res: Response) => {
  res.status(200).json(planets)
})

app.get("/getPlanets/:id", (req: Request, res: Response) => {
  const {id} = req.params
  const planet = planets.find(p => p.id === Number(id))
  res.status(200).json(planet)
})

app.post("/addPlanet", (req: Request, res: Response) => {
  const {id, name} = req.body;
  const newPlanet = {id, name};
  planets = [...planets, newPlanet];
  console.log(planets)
  res.status(201).json({msg: 'the planet is created'})
})

app.put("/editPlanet/:id", (req: Request, res: Response) => {
  const {id} = req.params;
  const {name} = req.body;
  planets = planets.map((p) => (p.id === Number(id) ? {...p, name} : p))
  console.log(planets)
  res.status(201).json({msg: 'the planet is edited'})
})

app.delete("/deletePlanet/:id", (req: Request, res: Response) => {
  const {id} = req.params;
  planets = planets.filter((p) => (p.id !== Number(id)))
  
  res.status(200).json({msg: 'the planet is deleted'})
})


app.listen(port, () => {
    console.log('server has started at port:', port, 'you can go to the link from here:', `http:localhost/${port}`)
})