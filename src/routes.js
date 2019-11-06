import { Router } from 'express';
import User from './app/models/Students';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Igor Rômulo',
    email: 'igor.romulo.santos@gmail.com',
    age: 32,
    weight: '93',
    height: '1.79',
  });

  res.json(user);
});

export default routes;
