
const {Router} = require('express');
const {getUsuarios, putUsuarios, postUsuarios, patchUsuarios, deleteUsuarios} = require('../controllers/usuarios')
const router = Router();

router.get("/", getUsuarios);

router.put("/", putUsuarios);

router.post("/", postUsuarios);

router.patch("/", patchUsuarios);

router.delete("/", deleteUsuarios);

module.exports = router;