import { Request, Response, Router } from 'express'; 
import { getRepository } from 'typeorm';
import { Fighter } from '../entities/Fighter';
import { check, validationResult } from 'express-validator';

const router = Router();
const fighterRepository = getRepository(Fighter);

// Create a new fighter
router.post('/fighters', async (req, res) => {
  try {
    // Data validation using express-validator
    await check('name', 'Name is required').notEmpty().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newFighter = fighterRepository.create(req.body);
    await fighterRepository.save(newFighter);
    res.json(newFighter);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Get all fighters
router.get('/fighters', async (req, res) => {
  try {
    const fighters = await fighterRepository.find();
    res.json(fighters);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Get a specific fighter by ID
router.get('/fighters/:id', async (req: Request, res: Response)=> {
  try {
    const fighterId=Number(req.params.id);
    const fighter = await fighterRepository.findOne({ where: { id: fighterId } });
    if (!fighter) {
      res.status(404).json({ message: 'Fighter not found' });
    } else {
      res.json(fighter);
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Update a specific fighter by ID
router.put('/fighters/:id', async (req: Request, res: Response) => {
  try {
    const fighterId: number = Number(req.params.id);
    const fighter = await fighterRepository.findOne({ where: { id: fighterId } });
    if (!fighter) {
      res.status(404).json({ message: 'Fighter not found' });
    } else {
      fighterRepository.merge(fighter, req.body);
      const updatedFighter = await fighterRepository.save(fighter);
      res.json(updatedFighter);
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Delete a specific fighter by ID
router.delete('/fighters/:id', async (req: Request, res: Response) => {
  try {
    const fighterId: number = Number(req.params.id);
    const fighter = await fighterRepository.findOne({ where: { id: fighterId } });
    if (!fighter) {
      res.status(404).json({ message: 'Fighter not found' });
    } else {
      await fighterRepository.remove(fighter);
      res.json({ message: 'Fighter deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Retrieve fight statistics for a specific fighter
router.get('/fighters/:id/stats', async (req, res) => {
  try {
    const fighterId = Number(req.params.id);
    const fighter = await fighterRepository.findOne({ where: { id: fighterId} });
    if (!fighter) {
      return res.status(404).json({ message: 'Fighter not found' });
    }

    // Calculate and return fighter's statistics
    const wins = fighter.wins;
    const losses = fighter.losses;
    const knockouts = fighter.knockouts;
    const submissions = fighter.submissions;

    res.json({ wins, losses, knockouts, submissions });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

export default router;
