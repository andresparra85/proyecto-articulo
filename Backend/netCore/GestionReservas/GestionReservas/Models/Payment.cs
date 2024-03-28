using System;
using System.Collections.Generic;

namespace GestionReservas.Models;

public partial class Payment
{
    public int IdPayment { get; set; }

    public decimal? Amount { get; set; }

    public DateOnly? Date { get; set; }

    public string? Paymentmethod { get; set; }

    public string? State { get; set; }

    public int? IdMember { get; set; }

    public int IdBooking { get; set; }

    public virtual Booking IdBookingNavigation { get; set; } = null!;

    public virtual Member? IdMemberNavigation { get; set; }
}
