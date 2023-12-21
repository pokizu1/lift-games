using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lift_games_database.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    gamename = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    about = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    mainimg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    miniimg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    download = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    screenshot1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    screenshot2 = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
