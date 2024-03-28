using System;
using System.Collections.Generic;

namespace GestionReservas.Models;

public partial class ServiceByReservation
{
    public int IdByBooking { get; set; }

    public int IdBooking { get; set; }

    public int IdService { get; set; }

    public virtual Booking IdBookingNavigation { get; set; } = null!;

    public virtual Service IdServiceNavigation { get; set; } = null!;
}
