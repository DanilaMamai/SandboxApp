using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAPIApp.Migrations
{
    public partial class PostsAddLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Posts",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Posts");
        }
    }
}
