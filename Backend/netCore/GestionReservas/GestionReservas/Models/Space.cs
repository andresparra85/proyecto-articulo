using System;
using System.Collections.Generic;

namespace GestionReservas.Models;

public partial class Space
{
    public int IdSpace { get; set; }

    public string? Spacename { get; set; }

    public string? Description { get; set; }

    public int? Capacitance { get; set; }

    public decimal? Precioporhora { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
