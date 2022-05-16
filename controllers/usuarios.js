const {response} = require("express");
const bcryptjs = require("bcryptjs")
const Usuario = require("../models/usuario");

const getUsuarios = async(req,res=response)=>{
    const {limit=5, desde=5} = req.query
    query={estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])
    
    res.json({
        msg: "get API - controller",
        usuarios,
        total
    })
}

const putUsuarios = async (req,res=response)=>{
    const {id} = req.params
    const {_id, password, google, correo, ...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        msg: "put API - controller",
        usuario
    })
}

const postUsuarios = async(req,res=response)=>{
    const {nombre, correo, rol, password} = req.body
    const usuario = new Usuario({nombre, correo, rol, password})
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    await usuario.save()
    res.json({
        usuario
    })
}

const patchUsuarios = (req,res=response)=>{
    res.json({
        msg: "patch API - controller"
    })
}

const deleteUsuarios = async(req,res=response)=>{
    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        msg: "delete API - controller",
        usuario
    })
}

module.exports={
    getUsuarios,
    putUsuarios,
    postUsuarios,
    patchUsuarios,
    deleteUsuarios
}