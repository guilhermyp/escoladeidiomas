using Microsoft.EntityFrameworkCore;

namespace ProjetoEscolaDeIdiomas.Models;

public class AppDbContext : DbContext
{
    public required DbSet<Aluno> Alunos { get; set; }
    public required DbSet<Materia> Materias { get; set; }
    public required DbSet<AlunoMateria> AlunoMaterias { get; set; } 
    public required DbSet<Professor> Professores { get; set; }

    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlite("Data Source=Notas.db");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        modelBuilder.Entity<Aluno>()
            .HasKey(a => a.Matricula);

       
        modelBuilder.Entity<Materia>()
            .HasKey(m => m.Id);

        modelBuilder.Entity<Materia>()
            .HasOne(m => m.Professor)
            .WithMany(p => p.Materias)
            .HasForeignKey(m => m.ProfessorId);

     
        modelBuilder.Entity<AlunoMateria>()
            .HasKey(am => new { am.AlunoId, am.MateriaId });

        modelBuilder.Entity<AlunoMateria>()
            .HasOne(am => am.Aluno)
            .WithMany(a => a.AlunoMaterias)
            .HasForeignKey(am => am.AlunoId);

        modelBuilder.Entity<AlunoMateria>()
            .HasOne(am => am.Materia)
            .WithMany(m => m.AlunoMaterias)
            .HasForeignKey(am => am.MateriaId);
    }
}