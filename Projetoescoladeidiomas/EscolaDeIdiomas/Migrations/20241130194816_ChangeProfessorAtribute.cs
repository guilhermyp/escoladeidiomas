using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EscolaDeIdiomas.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProfessorAtribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Professores",
                newName: "professorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "professorId",
                table: "Professores",
                newName: "Id");
        }
    }
}
