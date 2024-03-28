using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace GestionReservas.Models;

public partial class ThqnasmeContext : DbContext
{
    public ThqnasmeContext()
    {
    }

    public ThqnasmeContext(DbContextOptions<ThqnasmeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceByReservation> ServiceByReservations { get; set; }

    public virtual DbSet<Space> Spaces { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=salt.db.elephantsql.com;Database=thqnasme;Username=thqnasme;Password=AhZnODSRZcFOimYzDFhMcX1Ey1u0Emqu");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .HasPostgresExtension("btree_gin")
            .HasPostgresExtension("btree_gist")
            .HasPostgresExtension("citext")
            .HasPostgresExtension("cube")
            .HasPostgresExtension("dblink")
            .HasPostgresExtension("dict_int")
            .HasPostgresExtension("dict_xsyn")
            .HasPostgresExtension("earthdistance")
            .HasPostgresExtension("fuzzystrmatch")
            .HasPostgresExtension("hstore")
            .HasPostgresExtension("intarray")
            .HasPostgresExtension("ltree")
            .HasPostgresExtension("pg_stat_statements")
            .HasPostgresExtension("pg_trgm")
            .HasPostgresExtension("pgcrypto")
            .HasPostgresExtension("pgrowlocks")
            .HasPostgresExtension("pgstattuple")
            .HasPostgresExtension("tablefunc")
            .HasPostgresExtension("unaccent")
            .HasPostgresExtension("uuid-ossp")
            .HasPostgresExtension("xml2");

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.IdBooking).HasName("reservas_pkey");

            entity.ToTable("bookings");

            entity.Property(e => e.IdBooking)
                .HasDefaultValueSql("nextval('bookings_id_seq'::regclass)")
                .HasColumnName("id_booking");
            entity.Property(e => e.EndDate).HasColumnName("endDate");
            entity.Property(e => e.IdMember).HasColumnName("id_member");
            entity.Property(e => e.IdSpace).HasColumnName("id_space");
            entity.Property(e => e.Startdatetime).HasColumnName("startdatetime");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");

            entity.HasOne(d => d.IdMemberNavigation).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.IdMember)
                .HasConstraintName("bookings_id_member_fkey");

            entity.HasOne(d => d.IdSpaceNavigation).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.IdSpace)
                .HasConstraintName("bookings_id_space_fkey");
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.HasKey(e => e.IdMember).HasName("miembros_pkey");

            entity.ToTable("members");

            entity.Property(e => e.IdMember)
                .HasDefaultValueSql("nextval('members_id_seq'::regclass)")
                .HasColumnName("id_member");
            entity.Property(e => e.Company)
                .HasMaxLength(100)
                .HasColumnName("company");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("lastName");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.IdPayment).HasName("pagos_pkey");

            entity.Property(e => e.IdPayment)
                .HasDefaultValueSql("nextval('payment_id_seq'::regclass)")
                .HasColumnName("id_payment");
            entity.Property(e => e.Amount)
                .HasPrecision(10, 2)
                .HasColumnName("amount");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.IdBooking).HasColumnName("id_booking");
            entity.Property(e => e.IdMember).HasColumnName("id_member");
            entity.Property(e => e.Paymentmethod)
                .HasMaxLength(50)
                .HasColumnName("paymentmethod");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");

            entity.HasOne(d => d.IdBookingNavigation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.IdBooking)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Payments_id_booking_fkey");

            entity.HasOne(d => d.IdMemberNavigation).WithMany(p => p.Payments)
                .HasForeignKey(d => d.IdMember)
                .HasConstraintName("Payments_id_member_fkey");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.IdService).HasName("servicios_pkey");

            entity.ToTable("services");

            entity.Property(e => e.IdService)
                .ValueGeneratedNever()
                .HasColumnName("id_service");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.Location)
                .HasMaxLength(100)
                .HasColumnName(" location");
            entity.Property(e => e.Servicename)
                .HasMaxLength(50)
                .HasColumnName("servicename");
            entity.Property(e => e.Startdatetime).HasColumnName("startdatetime");
        });

        modelBuilder.Entity<ServiceByReservation>(entity =>
        {
            entity.HasKey(e => e.IdByBooking).HasName("ServicioByReserva_pkey");

            entity.ToTable("ServiceByReservation");

            entity.Property(e => e.IdByBooking)
                .ValueGeneratedNever()
                .HasColumnName("Id_By_Booking");
            entity.Property(e => e.IdBooking).HasColumnName("Id_booking");
            entity.Property(e => e.IdService).HasColumnName("Id_Service");

            entity.HasOne(d => d.IdBookingNavigation).WithMany(p => p.ServiceByReservations)
                .HasForeignKey(d => d.IdBooking)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ServiceByReservation_Id_booking_fkey");

            entity.HasOne(d => d.IdServiceNavigation).WithMany(p => p.ServiceByReservations)
                .HasForeignKey(d => d.IdService)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("ServiceByReservation_Id_Service_fkey");
        });

        modelBuilder.Entity<Space>(entity =>
        {
            entity.HasKey(e => e.IdSpace).HasName("espacios_pkey");

            entity.ToTable("spaces");

            entity.Property(e => e.IdSpace)
                .HasDefaultValueSql("nextval('spaces_id_seq'::regclass)")
                .HasColumnName("id_space");
            entity.Property(e => e.Capacitance).HasColumnName("capacitance");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Precioporhora)
                .HasPrecision(10, 2)
                .HasColumnName("precioporhora");
            entity.Property(e => e.Spacename)
                .HasMaxLength(50)
                .HasColumnName("spacename");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuarios_pkey");

            entity.ToTable("usuarios");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Edad).HasColumnName("edad");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });
        modelBuilder.HasSequence("bookings_id_seq");
        modelBuilder.HasSequence("members_id_seq");
        modelBuilder.HasSequence("payment_id_seq");
        modelBuilder.HasSequence("spaces_id_seq");

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
