const Services = require("../models").services_model;

module.exports = {
    // Listar todos los espacios
    list(req, res) {
        return Services
        .findAll({})
        .then((services) => res.status(200).send(services))
        .catch((error) => res.status(400).send(error));
    },

  // Obtener espacio por ID
  getById(req, res) {
    return Services
    .findByPk(req.params.id)
    .then((service) => {
        if (!service) {
        return res.status(404).send({
            message: "Space Not Found",
        });
        }
        return res.status(200).send(service);
    })
    .catch((error) => res.status(400).send(error));
},

add(req, res) {
    return Services
    .create({
        servicenameme: req.body.servicenameme,
        description: req.body.description,
        startdatetime: req.body.startdatetime,
        duration: req.body.duration,
        location: req.body.location,
        cost: req.body.cost,
    })
    .then((service) => res.status(201).send(service))
    .catch((error) => res.status(400).send(error));
},
 // Actualizar miembro por ID
 update(req, res) {
    return Services
    .findByPk(req.params.id)
    .then((service) => {
        if (!service) {
        return res.status(404).send({
            message: "Member Not Found",
        });
        }
        return service
        .update({
            servicenameme: req.body.servicenameme || service.name,
            description: req.body.description || service.description,
            startdatetime: req.body.startdatetime || service.startdatetime,
            duration: req.body.duration || service.duration,
            location: req.body.location || service.location,
            cost: req.body.cost || service.cost,
        })
        .then(() => res.status(200).send(service))  // Send back the updated space.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},

// Eliminar miembro por ID
delete(req, res) {
    return Services
    .findByPk(req.params.id)
    .then(service => {
        if (!service) {
        return res.status(400).send({
            message: "Space Not Found",
        });
        }
        return service
        .destroy()
        .then(() => res.status(204).send())
    })
}


};





    


