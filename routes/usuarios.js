
const {Router} = require('express');
const { check } = require('express-validator');
const {getUsuarios, putUsuarios, postUsuarios, patchUsuarios, deleteUsuarios} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarRol, existeEmail, existeUsuarioPorId} = require('../helpers/db-validators')
const router = Router();

router.get("/", getUsuarios);

router.put("/:id", 
[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(validarRol),
    validarCampos
],  putUsuarios);

router.post("/", 
[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio y mas de 6 letras").isLength({min: 6}),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existeEmail),
    check("rol").custom(validarRol),
    validarCampos
] , postUsuarios);

router.patch("/", patchUsuarios);

router.delete("/:id", 
[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
]   ,deleteUsuarios);

module.exports = router;