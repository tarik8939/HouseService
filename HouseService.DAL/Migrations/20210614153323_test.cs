using Microsoft.EntityFrameworkCore.Migrations;

namespace HouseService.DAL.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Advertisements_AdvertismentID",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_AdvertismentID",
                table: "Requests");

            migrationBuilder.DropColumn(
                name: "AdvertismentID",
                table: "Requests");

            migrationBuilder.CreateIndex(
                name: "IX_Requests_AdvertisementID",
                table: "Requests",
                column: "AdvertisementID");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Advertisements_AdvertisementID",
                table: "Requests",
                column: "AdvertisementID",
                principalTable: "Advertisements",
                principalColumn: "AdvertisementID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Requests_Advertisements_AdvertisementID",
                table: "Requests");

            migrationBuilder.DropIndex(
                name: "IX_Requests_AdvertisementID",
                table: "Requests");

            migrationBuilder.AddColumn<int>(
                name: "AdvertismentID",
                table: "Requests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Requests_AdvertismentID",
                table: "Requests",
                column: "AdvertismentID");

            migrationBuilder.AddForeignKey(
                name: "FK_Requests_Advertisements_AdvertismentID",
                table: "Requests",
                column: "AdvertismentID",
                principalTable: "Advertisements",
                principalColumn: "AdvertisementID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
