"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Event_1 = require("../entities/Event");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const eventRepository = (0, typeorm_1.getRepository)(Event_1.Event);
// Create a new event
router.post('/events', async (req, res) => {
    try {
        // Data validation using express-validator
        await (0, express_validator_1.check)('name', 'Name is required').notEmpty().run(req);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newEvent = eventRepository.create(req.body);
        await eventRepository.save(newEvent);
        res.json(newEvent);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});
// Get all events
router.get('/events', async (req, res) => {
    try {
        const events = await eventRepository.find();
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});
// Get a specific event by ID
router.get('/events/:id', async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        const event = await eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
        }
        else {
            res.json(event);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});
// Update a specific event by ID
router.put('/events/:id', async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        const event = await eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
        }
        else {
            eventRepository.merge(event, req.body);
            const updatedEvent = await eventRepository.save(event);
            res.json(updatedEvent);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});
// Delete a specific event by ID
router.delete('/events/:id', async (req, res) => {
    try {
        const eventId = Number(req.params.id);
        const event = await eventRepository.findOne({ where: { id: eventId } });
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
        }
        else {
            await eventRepository.remove(event);
            res.json({ message: 'Event deleted successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});
exports.default = router;
