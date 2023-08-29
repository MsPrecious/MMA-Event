import express from 'express';
import fighterRoutes from '../routes/fighter';
import eventRoutes from '../routes/event'; 
import fightRoutes from '../routes/fight'; 
const app = express();

app.use(express.json());

// Use fighter, event, and fight routes
app.use(fighterRoutes);
app.use(eventRoutes);
app.use(fightRoutes);

// Other middleware and routes...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
