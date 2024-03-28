const Spaces = require("../models").spaces_model;

module.exports = {
    // Listar todos los espacios
    list(req, res) {
        return Spaces
        .findAll({})
        .then((spaces) => res.status(200).send(spaces))
        .catch((error) => res.status(400).send(error));
    },
    
    // Obtener espacio por ID
    getById(req, res) {
        return Spaces
        .findByPk(req.params.id)
        .then((space) => {
            if (!space) {
            return res.status(404).send({
                message: "Space Not Found",
            });
            }
            return res.status(200).send(space);
        })
        .catch((error) => res.status(400).send(error));
    },
    
    // Agregar un nuevo espacio
    add(req, res) {
        return Spaces
        .create({
            spacename: req.body.spacename,
            description: req.body.description,
            capacitance: req.body.capacitance,
            precioporhora: req.body.precioporhora,
        })
        .then((space) => res.status(201).send(space))
        .catch((error) => res.status(400).send(error));
    },
    
    // Actualizar espacio por ID
    update(req, res) {
        return Spaces
        .findByPk(req.params.id)
        .then((space) => {
            if (!space) {
            return res.status(404).send({
                message: "Space Not Found",
            });
            }
            return space
            .update({
                spacename: req.body.spacename || space.spacename,
                description: req.body.description || space.description,
                capacitance: req.body.capacitance || space.capacitance,
                precioporhora: req.body.precioporhora || space.precioporhora,
            })
            .then(() => res.status(200).send(space))  // Send back the updated space.
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    
    // Eliminar espacio por ID
    delete(req, res) {
        return Spaces
        .findByPk(req.params.id)
        .then(space => {
            if (!space) {
            return res.status(400).send({
                message: "Space Not Found",
            });
            }
            return space
            .destroy()
            .then(() => res.status(204).send())
        })
    }
};
