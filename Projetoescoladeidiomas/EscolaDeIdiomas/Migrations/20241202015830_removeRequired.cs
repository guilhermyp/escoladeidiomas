using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EscolaDeIdiomas.Migrations
{
    /// <inheritdoc />
    public partial class removeRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "professorId",
                table: "Professores",
                newName: "ProfessorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProfessorId",
                table: "Professores",
                newName: "professorId");
        }
    }
}
