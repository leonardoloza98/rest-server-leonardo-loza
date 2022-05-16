const Role = require('../models/rol')
const Usuario = require('../models/usuario')

const validarRol = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const existeEmail= async(correo = "") =>{
  const existEmail = await Usuario.findOne({correo})

  if(existEmail){
      throw new Error(
        "El email ya se encuentra registrado"
      )
  }
}

const existeUsuarioPorId= async(id) =>{
  const existUsuario = await Usuario.findById(id)

  if(!existUsuario){
      throw new Error(
        `No existe usuario con el id ${id}`
      )
  }
}

module.exports={
    validarRol,
    existeEmail,
    existeUsuarioPorId
}