var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const { Foto, Etiqueta } = require('../models');

/* GET home page. */
router.get('/findAll/json', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: {
      model: require('../models').Etiqueta,
      attributes: ['id', 'texto'],
      through: { attributes: [] }
    }
  })
  .then(fotos => {
    res.json(fotos);
  })
  .catch(error => res.status(400).send(error));
});

router.get('/findAll/view', function(req, res, next) {
  Foto.findAll({
    attributes: { exclude: ['updatedAt'] },
    include: {
      model: Etiqueta,
      attributes: ['id', 'texto'],
      through: { attributes: [] }
    }
  })
  .then(fotos => {
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  })
  .catch(error => res.status(400).send(error));
});

router.get('/findById/json/:id', function(req, res, next) {
  Foto.findByPk(req.params.id, {
    attributes: { exclude: ['updatedAt'] },
    include: {
      model: Etiqueta,
      attributes: ['id', 'texto'],
      through: { attributes: [] }
    }
  })
  .then(foto => {
    if (foto) {
      res.json(foto);
    } else {
      res.status(404).send({ message: 'Foto no encontrada' });
    }
  })
  .catch(error => res.status(400).send(error));
});

router.get('/findById/view/:id', function(req, res, next) {
  Foto.findByPk(req.params.id, {
    attributes: { exclude: ['updatedAt'] },
    include: {
      model: Etiqueta,
      attributes: ['id', 'texto'],
      through: { attributes: [] }
    }
  })
  .then(foto => {
    if (foto) {
      res.render('search/foto', { title: 'Detalle de Foto', foto: foto });
    } else {
      res.status(404).send({ message: 'Foto no encontrada' });
    }
  })
  .catch(error => res.status(400).send(error));
});


module.exports = router;
