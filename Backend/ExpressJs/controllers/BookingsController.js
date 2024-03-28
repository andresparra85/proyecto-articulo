const Bookings = require("../models").bookings_model;
const Spaces = require("../models").spaces_model;
const Members = require("../models").members_model;
module.exports = {
  // Listar todas las reservas
  list(req, res) {
    return Bookings
      .findAll({})
      .then((bookings) => res.status(200).send(bookings))
      .catch((error) => res.status(400).send(error));
  },

  // Obtener reserva por ID
  getById(req, res) {
    return Bookings
      .findByPk(req.params.id)
      .then((booking) => {
        if (!booking) {
          return res.status(404).send({
            message: "Booking Not Found",
          });
        }
        return res.status(200).send(booking);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Agregar una nueva reserva
  add(req, res) {
    return Bookings
      .create({
        startdatetime: req.body.startdatetime,
        state: req.body.state,
        id_member: req.body.id_member,
        id_space: req.body.id_space,
        endDate: req.body.endDate,
      })
      .then(async (booking) => {
        // Obtener información del usuario asociado a la reserva
        const user = await Members.findByPk(booking.id_member);
        if (!user) {
          return res.status(404).send({
            message: "User not found",
          });
        }

        const space = await Spaces.findByPk(booking.id_space);
        if (!space) {
          return res.status(404).send({
            message: "espace not found",
          });
        }
        res.status(201).send(booking)})
      .catch((error) => res.status(400).send(error));
  },

    // Agregar una nueva reserva
  // add(req, res) {
  //   return Bookings
  //     .create({
  //       startdatetime: req.body.startdatetime,
  //       state: req.body.state,
  //       id_member: req.body.id_member,
  //       id_space: req.body.id_space,
  //       endDate: req.body.endDate,
  //     })
  //     .then((booking) => {
  //       const from = 'testemailnode85@gmail.com';
  //       const to = 'hernandopanto85@gmail.com';
  //       const subject = 'Reserva creada con exito';
  //       const html = `
  //               <h1>Se ha creado una nueva reserva: ADMC${booking.id_booking}.</h1>
  //               <h2>Detalles de la reserva:</h2>
  //               <table border="1" cellspacing="0" cellpadding="5">
  //                   <tr>
  //                       <th>ID de reserva</th>
  //                       <th>Fecha de inicio</th>
  //                       <th>Estado</th>
  //                       <th>ID de miembro</th>
  //                       <th>ID de espacio</th>
  //                       <th>Fecha de finalización</th>
  //                   </tr>
  //                   <tr>
  //                       <td>${booking.id_booking}</td>
  //                       <td>${booking.startdatetime}</td>
  //                       <td>${booking.state}</td>
  //                       <td>${booking.id_member}</td>
  //                       <td>${booking.id_space}</td>
  //                       <td>${booking.endDate}</td>
  //                   </tr>
  //               </table>
  //           `;
  //       emailService.sendEmail(from, to, subject, html);
  //       res.status(201).send(booking)})
  //     .catch((error) => res.status(400).send(error));
  // },

  // Actualizar reserva por ID
  update(req, res) {
    return Bookings
      .findByPk(req.params.id)
      .then((booking) => {
        if (!booking) {
          return res.status(404).send({
            message: "Booking Not Found",
          });
        }
        return booking
          .update({
            startdatetime: req.body.startdatetime || booking.startdatetime,
            state: req.body.state || booking.state,
            id_member: req.body.id_member || booking.id_member,
            id_space: req.body.id_space || booking.id_space,
            endDate: req.body.endDate || booking.endDate,
          })
          .then(async (booking) => {
            // Obtener información del usuario asociado a la reserva
            const user = await Members.findByPk(booking.id_member);
            if (!user) {
              return res.status(404).send({
                message: "User not found",
              });
            }
    
            const space = await Spaces.findByPk(booking.id_space);
            if (!space) {
              return res.status(404).send({
                message: "espace not found",
              });
            }
            res.status(201).send(booking)})
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Eliminar reserva por ID
  delete(req, res) {
    return Bookings
      .findByPk(req.params.id)
      .then((booking) => {
        if (!booking) {
          return res.status(400).send({
            message: "Booking Not Found",
          });
        }
        return booking
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Listar todas las reservas con detalles completos
  listFull(req, res) {
    return Bookings
      .findAll({
        include: [
          {
            model: Spaces,
          },
          {
            model: Members,
          },
        ],
      })
      .then((bookings) => res.status(200).send(bookings))
      .catch((error) => res.status(400).send(error));
  },
};
