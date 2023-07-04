import { Request, Response } from "express";
import db from '../db'


const getAll = async (req: Request, res: Response) => {
    try {
        const planets = await db.any('SELECT * FROM planets');
        res.status(200).json(planets);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOneById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const planet = await db.one('SELECT * FROM planets WHERE id = $1', [id]);
      res.status(200).json(planet);
    } catch (error) {
      res.status(404).json({ error: 'Planet not found' });
    }
};

const create = async (req: Request, res: Response) => {
    const { name } = req.body;
    
    try {
      const query = "INSERT INTO planets (name) VALUES ($1) RETURNING id";
      const result = await db.one(query, [name]);
      const id = result.id;
  
      res.status(201).json({ id, msg: 'Planet created' });
    } catch (error) {
      console.error('Error creating planet:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
const updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        await db.none('UPDATE planets SET name = $1 WHERE id = $2', [name, id]);
        res.status(200).json({ msg: 'Planet updated' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await db.none('DELETE FROM planets WHERE id = $1', [id]);
        res.status(200).json({ msg: 'Planet deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updatePlanetImage = async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if req.file exists
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    const { path } = req.file;

    try {
        const query = 'UPDATE planets SET image=$2 WHERE id=$1';
        await db.none(query, [id, path]);

        res.status(200).json({ msg: 'Planet image updated' });
    } catch (error) {
        console.error('Error updating planet image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {getAll, getOneById, create, updateById, deleteById, updatePlanetImage}