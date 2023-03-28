const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use(require('./add-client'));
router.use(require('./add-car'));
router.use(require('./add-order'));
router.use(require('./add-services'));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
