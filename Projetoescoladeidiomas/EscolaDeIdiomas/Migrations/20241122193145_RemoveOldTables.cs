using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EscolaDeIdiomas.Migrations
{
    /// <inheritdoc />
    public partial class RemoveOldTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Professores");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Professores");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Professores",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Professores",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
