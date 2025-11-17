// Legt nur die Routen für die Authentifizierung fest
import { Router } from 'express';
import { register } from '../controllers/auth.controller';
import { login } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login); // Login-Route mit POST-Methode, da sensible Daten gesendet werden, die nicht in der URL sichtbar sein sollten
router.post('/register', register); // Registrierungs-Route

export default router;