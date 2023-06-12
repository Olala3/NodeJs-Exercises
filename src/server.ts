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
    res.send(planets)
})


app.listen(port, () => {
    console.log('server has started at port:', port, 'you can go to the link from here:', `http:localhost/${port}`)
})