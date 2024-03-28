using System;
using System.Collections.Generic;

namespace GestionReservas.Models;

public partial class Booking
{
    public int IdBooking { get; set; }

    public DateOnly? Startdatetime { get; set; }

    public string? State { get; set; }

    public int? IdMember { get; set; }

    public int? IdSpace { get; set; }

    public DateOnly? EndDate { get; set; }

    public virtual Member? IdMemberNavigation { get; set; }

    public virtual Space? IdSpaceNavigation { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<ServiceByReservation> ServiceByReservations { get; set; } = new List<ServiceByReservation>();
}
