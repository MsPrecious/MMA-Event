import { Request, Response, Router } from 'express'; 
import { getRepository } from 'typeorm';
import { Event } from '../entities/Event';
import { check, validationResult } from 'express-validator';

const router = Router();
const eventRepository = getRepository(Event);

// Create a new event
router.post('/events', async (req: Request, res: Response) => {
  try {
    // Data validation using express-validator
    await check('name', 'Name is required').notEmpty().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newEvent = eventRepository.create(req.body);
    await eventRepository.save(newEvent);
    res.json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Get all events
router.get('/events', async (req: Request, res: Response) => {
  try {
    const events = await eventRepository.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Get a specific event by ID
router.get('/events/:id', async (req: Request, res: Response) => {
  try {
    const eventId = Number(req.params.id);
    const event = await eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json(event);
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Update a specific event by ID
router.put('/events/:id', async (req: Request, res: Response) => {
  try {
    const eventId: number = Number(req.params.id);
    const event = await eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      eventRepository.merge(event, req.body);
      const updatedEvent = await eventRepository.save(event);
      res.json(updatedEvent);
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

// Delete a specific event by ID
router.delete('/events/:id', async (req: Request, res: Response) => {
  try {
    const eventId: number = Number(req.params.id);
    const event = await eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      await eventRepository.remove(event);
      res.json({ message: 'Event deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: (error as Error).message });
  }
});

export default router;
