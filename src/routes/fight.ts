
import { Request, Response, Router } from 'express'; 
import { getRepository } from 'typeorm';
import { Fight } from '../entities/Fight';
import { Fighter } from '../entities/Fighter'; 
import { check, validationResult } from 'express-validator';

const router = Router();
const fightRepository = getRepository(Fight);
const fighterRepository = getRepository(Fighter);

// Create a new fight
router.post('/fights', async (req, res) => {
  try {
    // Data validation using express-validator
    await check('fighter1Id', 'Fighter 1 ID is required').notEmpty().isNumeric().run(req);
    await check('fighter2Id', 'Fighter 2 ID is required').notEmpty().isNumeric().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fighter1Id = Number(req.body.fighter1Id);
    const fighter2Id = Number(req.body.fighter2Id);

    const newFight = fightRepository.create(req.body);
    await fightRepository.save(newFight);

    // After saving the fight, trigger ranking update for both fighters
    await updateFighterRanking(fighter1Id);
    await updateFighterRanking(fighter2Id);

    res.json(newFight);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});


// Get all fights
router.get('/fights', async (req, res) => {
  try {
    const fights = await fightRepository.find();
    res.json(fights);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Get a specific fight by ID
router.get('/fights/:id', async (req: Request, res: Response) => {
  try {
    const fightId=Number(req.params.id);
    const fight = await fightRepository.findOne({ where: { id: fightId } });
    if (!fight) {
      res.status(404).json({ message: 'Fight not found' });
    } else {
      res.json(fight);
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Update a specific fight by ID
router.put('/fights/:id', async (req: Request, res: Response) => {
  try {
    const fightId:number=Number(req.params.id);
    const fight = await fightRepository.findOne({ where: { id: fightId } });
    if (!fight) {
      res.status(404).json({ message: 'Fight not found' });
    } else {
      fightRepository.merge(fight, req.body);
      const updatedFight = await fightRepository.save(fight);
      res.json(updatedFight);
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Delete a specific fight by ID
router.delete('/fights/:id', async (req: Request, res: Response) => {
  try {
    const fightId:number=Number(req.params.id);
    const fight = await fightRepository.findOne({ where: { id: fightId } });
    if (!fight) {
      res.status(404).json({ message: 'Fight not found' });
    } else {
      await fightRepository.remove(fight);
      res.json({ message: 'Fight deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Function to calculate and update fighter ranking
async function updateFighterRanking(fighterId: number) {
  const fighter = await fighterRepository.findOne({ where: { id: fighterId} });

  if (fighter) {
    const score = calculateFighterScore(fighter); // Calculate fighter's score
    fighter.rank = score; // Update the rank field
    await fighterRepository.save(fighter); // Save the updated fighter
  }
}

// Function to calculate fighter's score based on fight records
function calculateFighterScore(fighter: Fighter): number {
  let score = fighter.wins * 2 - fighter.losses;
  score += fighter.knockouts + fighter.submissions;
  return score;
}

export default router;
