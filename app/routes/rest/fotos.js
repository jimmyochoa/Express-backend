const express = require('express');
const router = express.Router();

const { Sequelize, Op } = require('sequelize');
const { Foto, Etiqueta } = require('../../models');

router.get('/findAll/json', async (req, res) => {
    try {
        const fotos = await Foto.findAll({
            attributes: { exclude: ["updatedAt", "createdAt"] },
            include: [{
                model: Etiqueta,
                attributes: ['texto'],
                through: { attributes: [] }
            }]
        });
        res.json(fotos);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/findById/:id/json', function (req, res,
    next) {
    let id = parseInt(req.params.id);
    Foto.findAll({
        attributes: {
            exclude: ["updatedAt",
                "createdAt"]
        },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            [Op.and]: [
                { id: id }
            ]
        }
    })
        .then(fotos => {
            res.json(fotos);
        })
        .catch(error => res.status(400).send(error))
});

router.post('/save', function(req, res, next) {  
    let {titulo, descripcion, calificacion, ruta} = req.body;
     Foto.create({
     titulo: titulo,
     descripcion: descripcion,
     calificacion: parseFloat(calificacion),
     ruta: ruta,
     createdAt: new Date(),  
    updatedAt: new Date()})
    .then(fotos => {
        res.json(fotos);
    })
    .catch(error => 
        res.status(400).send(error))
    })

module.exports = router;