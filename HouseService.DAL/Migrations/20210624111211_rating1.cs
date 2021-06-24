using Microsoft.EntityFrameworkCore.Migrations;

namespace HouseService.DAL.Migrations
{
    public partial class rating1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Rating",
                table: "Users",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<float>(
                name: "Rating",
                table: "Users",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
