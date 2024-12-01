using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace ProjetoEscolaDeIdiomas.Models
{
    public class Professor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProfessorId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; } = string.Empty; 

        public ICollection<Materia> Materias { get; set; }
    }
}
