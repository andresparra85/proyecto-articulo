const Members = require("../models").members_model;

module.exports = {

    // Listar todos los miembros
    list(req, res) {
        return Members
        .findAll({})
        .then((members) => res.status(200).send(members))
        .catch((error) => res.status(400).send(error));
    },
    
    // Obtener miembro por ID
    getById(req, res) {
        return Members
        .findByPk(req.params.id)
        .then((member) => {
            if (!member) {
            return res.status(404).send({
                message: "Member Not Found",
            });
            }
            return res.status(200).send(member);
        })
        .catch((error) => res.status(400).send(error));
    },
    
    // Agregar un nuevo miembro
    add(req, res) {
        return Members
        .create({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            company: req.body.company,
        })
        .then((member) => res.status(201).send(member))
        .catch((error) => res.status(400).send(error));
    },
    
    // Actualizar miembro por ID
    update(req, res) {
        return Members
        .findByPk(req.params.id)
        .then((member) => {
            if (!member) {
            return res.status(404).send({
                message: "Member Not Found",
            });
            }
            return member
            .update({
                name: req.body.name || member.name,
                lastName: req.body.lastName || member.lastName,
                email: req.body.email || member.email,
                phone: req.body.phone || member.phone,
                company: req.body.company || member.company,
            })
            .then(() => res.status(200).send(member))  // Send back the updated space.
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
    },
    
    // Eliminar miembro por ID
    delete(req, res) {
        return Members
        .findByPk(req.params.id)
        .then(member => {
            if (!member) {
            return res.status(400).send({
                message: "Space Not Found",
            });
            }
            return member
            .destroy()
            .then(() => res.status(204).send())
        })
    }
};
