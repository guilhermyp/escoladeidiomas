﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjetoEscolaDeIdiomas.Models;

#nullable disable

namespace EscolaDeIdiomas.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.Aluno", b =>
                {
                    b.Property<int>("Matricula")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Matricula");

                    b.ToTable("Alunos");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.AlunoMateria", b =>
                {
                    b.Property<int>("AlunoId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MateriaId")
                        .HasColumnType("INTEGER");

                    b.Property<double?>("Nota")
                        .HasColumnType("REAL");

                    b.HasKey("AlunoId", "MateriaId");

                    b.HasIndex("MateriaId");

                    b.ToTable("AlunoMaterias");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.Materia", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<int?>("ProfessorId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ProfessorId");

                    b.ToTable("Materias");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.Professor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Professores");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.AlunoMateria", b =>
                {
                    b.HasOne("ProjetoEscolaDeIdiomas.Models.Aluno", "Aluno")
                        .WithMany("AlunoMaterias")
                        .HasForeignKey("AlunoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ProjetoEscolaDeIdiomas.Models.Materia", "Materia")
                        .WithMany("AlunoMaterias")
                        .HasForeignKey("MateriaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Aluno");

                    b.Navigation("Materia");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.Materia", b =>
                {
                    b.HasOne("ProjetoEscolaDeIdiomas.Models.Professor", "Professor")
                        .WithMany("Materias")
                        .HasForeignKey("ProfessorId");

                    b.Navigation("Professor");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.Aluno", b =>
                {
                    b.Navigation("AlunoMaterias");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.Materia", b =>
                {
                    b.Navigation("AlunoMaterias");
                });

            modelBuilder.Entity("ProjetoEscolaDeIdiomas.Models.Professor", b =>
                {
                    b.Navigation("Materias");
                });
#pragma warning restore 612, 618
        }
    }
}
