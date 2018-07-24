using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Shop.DAL
{
    public class ShopContext: DbContext
    {
        public ShopContext() : base("shopContext")
        {
        }

        public virtual DbSet<Store> Stores { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductSold> ProductSolds { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<ProductSold>()
                .HasRequired<Product>(s => s.Product);
            modelBuilder.Entity<ProductSold>()
                .HasRequired<Customer>(s => s.Customer);
            modelBuilder.Entity<ProductSold>()
                .HasRequired<Store>(s => s.Store);
        }
    }
}