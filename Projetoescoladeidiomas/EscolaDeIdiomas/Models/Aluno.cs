using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ProjetoEscolaDeIdiomas.Models;

public class Aluno
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Matricula { get; set; } 

    [Required(ErrorMessage = "O nome do aluno é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O nome pode ter apenas máximo 100 caracteres.")]
    public string Nome { get; set; } = string.Empty;
    
     [JsonIgnore]
    public ICollection<AlunoMateria> AlunoMaterias { get; set; } = new List<AlunoMateria>();  
} 