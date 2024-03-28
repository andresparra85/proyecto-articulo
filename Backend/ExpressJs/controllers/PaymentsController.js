const Payments = require("../models").Payments_model;
const Members = require("../models").members_model;
const Bookings = require("../models").bookings_model;
module.exports = {
  // Listar todos los pagos
  list(req, res) {
    return Payments.findAll({})
      .then((payments) => res.status(200).send(payments))
      .catch((error) => res.status(400).send(error));
  },

  // Obtener pago por ID
  getById(req, res) {
    return Payments.findByPk(req.params.id)
      .then((payment) => {
        if (!payment) {
          return res.status(404).send({
            message: "Payment Not Found",
          });
        }
        return res.status(200).send(payment);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Agregar un nuevo pago
  add(req, res) {
    return Payments.create({
      amount: req.body.amount,
      date: req.body.date,
      paymentmethod: req.body.paymentmethod,
      state: req.body.state,
      id_member: req.body.id_member,
      id_booking: req.body.id_booking,
    })
      .then(async (payment) => {
        console.log(payment)
        // Obtener información del usuario asociado al pago
        const user = await Members.findByPk(payment.id_member);
        if (!user) {
          return res.status(404).send({
            message: "User not found",
          });
        }

        // Obtener información de la reserva asociada al pago
        const booking = await Bookings.findByPk(payment.id_booking);
        if (!booking) {
          return res.status(404).send({
            message: "Booking not found",
          });
        }
        // Devolver la respuesta al cliente
        res.status(201).send(payment);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Actualizar pago por ID
  update(req, res) {
    return Payments.findByPk(req.params.id)
      .then((payment) => {
        if (!payment) {
          return res.status(404).send({
            message: "Payment Not Found",
          });
        }
        return payment
          .update({
            amount: req.body.amount || payment.amount,
            date: req.body.date || payment.date,
            paymentmethod: req.body.paymentmethod || payment.paymentmethod,
            state: req.body.state || payment.state,
            id_member: req.body.id_member || payment.id_member,
            id_booking: req.body.id_booking || payment.id_booking,
          })
          .then(() => res.status(200).send(payment))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Eliminar pago por ID
  delete(req, res) {
    return Payments.findByPk(req.params.id)
      .then((payment) => {
        if (!payment) {
          return res.status(400).send({
            message: "Payment Not Found",
          });
        }
        return payment
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  // Listar todas los pagos con detalles completos
  async listFull(req, res) {
    try {
      const payments = await Payments.findAll({
        include: [
          {
            model: Members,
          },
          {
            model: Bookings,
          },
        ],
      });

      // Si no se encontraron pagos, se envía una respuesta 404
      if (!payments || payments.length === 0) {
        return res.status(404).send({ message: "No payments found" });
      }

      // Si se encontraron pagos, se envía la respuesta con los datos obtenidos
      res.status(200).send(payments);
    } catch (error) {
      // Si ocurre algún error, se envía una respuesta de error 400
      res.status(400).send(error);
    }
  },
};
