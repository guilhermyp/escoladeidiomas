using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoEscolaDeIdiomas.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

// Configuração para aceitar requisições JSON
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

builder.Services.AddCors(
    options => 
        options.AddPolicy("Acesso Total",
            configs => configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod())
        );

var app = builder.Build();

// CRUD para Alunos
app.MapGet("/alunos", async ([FromServices] AppDbContext db) =>
{
    return await db.Alunos.ToListAsync();
});

app.MapPost("/alunos/cadastrar", async ([FromServices] AppDbContext db, [FromBody] Aluno novoAluno) =>
{
    if (string.IsNullOrWhiteSpace(novoAluno.Nome))
    {
        return Results.BadRequest("O nome do aluno é obrigatório.");
    }

    db.Alunos.Add(novoAluno);
    await db.SaveChangesAsync();

    return Results.Created($"/alunos/{novoAluno.Matricula}", novoAluno);
});

app.MapPut("/alunos/editar/{matricula:int}", async ([FromServices] AppDbContext db, int matricula, [FromBody] Aluno alunoAtualizado) =>
{
    var aluno = await db.Alunos.FindAsync(matricula);
    if (aluno is null)
    {
        return Results.NotFound($"Aluno com matrícula {matricula} não encontrado.");
    }

    aluno.Nome = alunoAtualizado.Nome;
    await db.SaveChangesAsync();

    return Results.Ok(aluno);
});

app.MapDelete("/alunos/excluir/{matricula:int}", async ([FromServices] AppDbContext db, int matricula) =>
{
    var aluno = await db.Alunos.FindAsync(matricula);
    if (aluno is null)
    {
        return Results.NotFound($"Aluno com matrícula {matricula} não encontrado.");
    }

    db.Alunos.Remove(aluno);
    await db.SaveChangesAsync();

    return Results.Ok($"Aluno com matrícula {matricula} foi excluído.");
});

// CRUD para Professores
app.MapGet("/professores", async ([FromServices] AppDbContext db) =>
{
    return await db.Professores.ToListAsync();
});

app.MapPost("/professores/cadastrar", async ([FromServices] AppDbContext db, [FromBody] Professor novoProfessor) =>
{
    if (string.IsNullOrWhiteSpace(novoProfessor.Nome))
    {
        return Results.BadRequest("O nome do professor é obrigatório.");
    }

    db.Professores.Add(novoProfessor);
    await db.SaveChangesAsync();

    return Results.Created($"/professores/{novoProfessor.professorId}", novoProfessor);
});

app.MapPut("/professores/editar/{id:int}", async ([FromServices] AppDbContext db, int id, [FromBody] Professor professorAtualizado) =>
{
    var professor = await db.Professores.FindAsync(id);
    if (professor == null)
    {
        return Results.NotFound($"Professor com ID {id} não encontrado.");
    }

    professor.Nome = professorAtualizado.Nome;
    await db.SaveChangesAsync();

    return Results.Ok(professor);
});

app.MapDelete("/professores/excluir/{id:int}", async ([FromServices] AppDbContext db, int id) =>
{
    var professor = await db.Professores.FindAsync(id);
    if (professor == null)
    {
        return Results.NotFound($"Professor com ID {id} não encontrado.");
    }

    db.Professores.Remove(professor);
    await db.SaveChangesAsync();

    return Results.Ok($"Professor com ID {id} foi excluído.");
});

//vincular professor a matéria
app.MapPut("/materias/{materiaId:int}/vincular-professor/{professorId:int}", async ([FromServices] AppDbContext db, int materiaId, int professorId) =>
{
    var materia = await db.Materias.FindAsync(materiaId);
    if (materia == null)
    {
        return Results.NotFound($"Matéria com ID {materiaId} não encontrada.");
    }

    var professor = await db.Professores.FindAsync(professorId);
    if (professor == null)
    {
        return Results.NotFound($"Professor com ID {professorId} não encontrado.");
    }

    materia.ProfessorId = professorId;
    await db.SaveChangesAsync();

    return Results.Ok($"Professor com ID {professorId} foi vinculado à matéria com ID {materiaId}.");
});

// CRUD para Matérias
app.MapGet("/materias", async ([FromServices] AppDbContext db) =>
{
    return await db.Materias
        .Include(m => m.Professor)
        .Select(m => new
        {
            m.Id,
            m.Nome,
            Professor = m.Professor != null ? m.Professor.Nome : "Sem professor"
        })
        .ToListAsync();
});

app.MapPost("/materias/cadastrar", async ([FromServices] AppDbContext db, [FromBody] Materia novaMateria) =>
{
    if (string.IsNullOrWhiteSpace(novaMateria.Nome))
    {
        return Results.BadRequest("O nome da matéria é obrigatório.");
    }

    db.Materias.Add(novaMateria);
    await db.SaveChangesAsync();

    return Results.Created($"/materias/{novaMateria.Id}", novaMateria);
});

//Editar Materia
app.MapPut("/materias/editar/{id:int}", async ([FromServices] AppDbContext db, int id, [FromBody] Materia materiaAtualizada) =>
{
    var materia = await db.Materias.FindAsync(id);
    if (materia == null)
    {
        return Results.NotFound($"Matéria com ID {id} não encontrada.");
    }

    materia.Nome = materiaAtualizada.Nome;
    await db.SaveChangesAsync();

    return Results.Ok(materia);
});


// Inscrever aluno em matéria
app.MapPost("/alunos/{matricula:int}/inscrever/{materiaId:int}", async ([FromServices] AppDbContext db, int matricula, int materiaId) =>
{
    var aluno = await db.Alunos.FindAsync(matricula);
    if (aluno is null) return Results.NotFound($"Aluno com matrícula {matricula} não encontrado.");

    var materia = await db.Materias.FindAsync(materiaId);
    if (materia is null) return Results.NotFound($"Matéria com ID {materiaId} não encontrada.");

    var jaInscrito = await db.AlunoMaterias.AnyAsync(am => am.AlunoId == matricula && am.MateriaId == materiaId);
    if (jaInscrito)
    {
        return Results.BadRequest($"O aluno já está inscrito na matéria.");
    }

    var alunoMateria = new AlunoMateria
    {
        AlunoId = matricula,
        MateriaId = materiaId
    };

    db.AlunoMaterias.Add(alunoMateria);
    await db.SaveChangesAsync();

    return Results.Created($"/alunos/{matricula}/materias/{materiaId}", alunoMateria);
});



// Atribuir nota a um aluno em uma matéria
app.MapPost("/alunos/{matricula:int}/materias/{materiaId:int}/nota", async ([FromServices] AppDbContext db, int matricula, int materiaId, [FromBody] double nota) =>
{
    if (nota < 0 || nota > 10)
    {
        return Results.BadRequest("A nota deve estar entre 0 e 10.");
    }

    var alunoMateria = await db.AlunoMaterias.FirstOrDefaultAsync(am => am.AlunoId == matricula && am.MateriaId == materiaId);
    if (alunoMateria is null)
    {
        return Results.NotFound($"Aluno ou matéria não encontrados, ou vínculo inexistente.");
    }

    alunoMateria.Nota = nota;
    await db.SaveChangesAsync();

    return Results.Ok($"Nota {nota} atribuída ao aluno {matricula} na matéria {materiaId}.");
});

//alterar nota do aluno na materia

app.MapPut("/alunos/{matricula:int}/materias/{materiaId:int}/nota", async (HttpContext context, [FromServices] AppDbContext db, int matricula, int materiaId) =>
{
    // Verifica se o método é PUT
    if (context.Request.Method != HttpMethods.Put)
    {
        return Results.StatusCode(405);
    }

    // Lê o valor da nova nota
    double novaNota;
    try
    {
        novaNota = await context.Request.ReadFromJsonAsync<double>();
    }
    catch
    {
        return Results.BadRequest("Formato inválido para a nota.");
    }

    if (novaNota < 0 || novaNota > 10)
    {
        return Results.BadRequest("A nota deve estar entre 0 e 10.");
    }

    var alunoMateria = await db.AlunoMaterias.FirstOrDefaultAsync(am => am.AlunoId == matricula && am.MateriaId == materiaId);
    if (alunoMateria is null)
    {
        return Results.NotFound($"Vínculo entre o aluno {matricula} e a matéria {materiaId} não encontrado.");
    }

    alunoMateria.Nota = novaNota;
    await db.SaveChangesAsync();

    return Results.Ok($"Nota atualizada para {novaNota} no aluno {matricula}, matéria {materiaId}.");
});



// Consultar boletim de um aluno
app.MapGet("/alunos/{matricula:int}/boletim", async ([FromServices] AppDbContext db, int matricula) =>
{
    var aluno = await db.Alunos
        .Include(a => a.AlunoMaterias)
        .ThenInclude(am => am.Materia)
        .FirstOrDefaultAsync(a => a.Matricula == matricula);

    if (aluno is null) return Results.NotFound($"Aluno com matrícula {matricula} não encontrado.");

    var boletim = new
    {
        NomeAluno = aluno.Nome,
        Materias = aluno.AlunoMaterias.Select(am => new
        {
            Materia = am.Materia.Nome,
            Nota = am.Nota.HasValue ? am.Nota.Value.ToString("0.0") : "Sem nota"
        }).ToList()
    };

    return Results.Ok(boletim);
});

app.UseCors("Acesso Total");
app.Run();