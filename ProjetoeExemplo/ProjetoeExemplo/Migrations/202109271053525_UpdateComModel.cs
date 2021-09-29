namespace ProjetoeExemplo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateComModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ProjName = c.String(),
                        Budget = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.TaskDoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TaskName = c.String(),
                        ProjectId = c.Int(),
                        UserId = c.String(nullable: false, maxLength: 128),
                        DataLimite = c.DateTime(nullable: false),
                        State = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.Projects", t => t.ProjectId)
                .Index(t => t.ProjectId)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TaskDoes", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.TaskDoes", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Projects", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.TaskDoes", new[] { "UserId" });
            DropIndex("dbo.TaskDoes", new[] { "ProjectId" });
            DropIndex("dbo.Projects", new[] { "UserId" });
            DropTable("dbo.TaskDoes");
            DropTable("dbo.Projects");
        }
    }
}
