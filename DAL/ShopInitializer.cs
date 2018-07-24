using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;

namespace Shop.DAL
{
    public class ShopInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<ShopContext>
    {
        protected override void Seed(ShopContext context)
        {
            List<Store> stores = new List<Store>()
            {
                new Store() { Name = "Store NewYork", Address = "New York city"},
                new Store() { Name = "Store London", Address = "London city"},
            };

            List<Customer> customers = new List<Customer>()
            {
                new Customer() { Name = "Lyndon Stay", Address = "Wellington"},
                new Customer() { Name = "Jennifer Smith", Address = "Christchurch"},
            };

            List<Product> products = new List<Product>()
            {
                new Product() { Name = "Asus Computer", Price = 800},
                new Product() { Name = "Ipad", Price = 500},
            };

            foreach (var customer in customers)
            {
                context.Customers.Add(customer);
            }

            foreach (var store in stores)
            {
                context.Stores.Add(store);
            }

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
            base.Seed(context);

        }
    }
}