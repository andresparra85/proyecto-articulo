using System;
using System.Collections.Generic;

namespace GestionReservas.Models;

public partial class Service
{
    public int IdService { get; set; }

    public string? Servicename { get; set; }

    public string? Description { get; set; }

    public DateOnly? Startdatetime { get; set; }

    public int? Duration { get; set; }

    public string? Location { get; set; }

    public long? Cost { get; set; }

    public virtual ICollection<ServiceByReservation> ServiceByReservations { get; set; } = new List<ServiceByReservation>();
}
