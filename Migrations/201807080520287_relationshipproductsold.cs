namespace Shop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class relationshipproductsold : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProductSold",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        CustomerId = c.Int(nullable: false),
                        StoreId = c.Int(nullable: false),
                        DateSold = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customer", t => t.CustomerId, cascadeDelete: true)
                .ForeignKey("dbo.Product", t => t.ProductId, cascadeDelete: true)
                .ForeignKey("dbo.Store", t => t.StoreId, cascadeDelete: true)
                .Index(t => t.ProductId)
                .Index(t => t.CustomerId)
                .Index(t => t.StoreId);
            
            CreateTable(
                "dbo.Customer",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Address = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductSold", "StoreId", "dbo.Store");
            DropForeignKey("dbo.ProductSold", "ProductId", "dbo.Product");
            DropForeignKey("dbo.ProductSold", "CustomerId", "dbo.Customer");
            DropIndex("dbo.ProductSold", new[] { "StoreId" });
            DropIndex("dbo.ProductSold", new[] { "CustomerId" });
            DropIndex("dbo.ProductSold", new[] { "ProductId" });
            DropTable("dbo.Product");
            DropTable("dbo.Customer");
            DropTable("dbo.ProductSold");
        }
    }
}
