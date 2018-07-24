namespace Shop.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class require_name_and_address : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Store", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Store", "Address", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Store", "Address", c => c.String());
            AlterColumn("dbo.Store", "Name", c => c.String());
        }
    }
}
