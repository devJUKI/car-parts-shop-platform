using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdsWebsiteAPI.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDeleteCars : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Shops_ShopId",
                table: "Cars");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Shops_ShopId",
                table: "Cars",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Shops_ShopId",
                table: "Cars");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Shops_ShopId",
                table: "Cars",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id");
        }
    }
}
