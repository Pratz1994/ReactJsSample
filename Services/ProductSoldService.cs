using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Shop.DAL;
using Shop.Models;

namespace Shop.Services
{
    public class ProductSoldService: IProductSoldService
    {
        private ShopContext shopContext;

        public ProductSoldService(ShopContext _context)
        {
            this.shopContext = _context;
        }

        public List<ProductSold> FindAll()
        {
            return shopContext.ProductSolds.ToList();
        }

        public ProductSold FindOne(int Id)
        {
            return shopContext.ProductSolds.Find(Id);
        }

        public ProductSold Save(ProductSold productSold)
        {
            try
            {
                shopContext.ProductSolds.Add(productSold);
                shopContext.SaveChanges();
                return productSold;
            }
            catch (DbEntityValidationException ex)
            {
                // Retrieve the error messages as a list of strings.
                var errorMessages = ex.EntityValidationErrors
                        .SelectMany(x => x.ValidationErrors)
                        .Select(x => x.ErrorMessage);

                // Join the list to a single string.
                var fullErrorMessage = JsonConvert.SerializeObject(errorMessages);

                // Combine the original exception message with the new one.
                var exceptionMessage = fullErrorMessage;

                // Throw a new DbEntityValidationException with the improved exception message.
                throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);

            }
        }

        public ProductSold Update(ProductSold productSold, int productId, int customerId, int storeId, 
            DateTime dateSold)
        {
            productSold.ProductId = productId;
            productSold.CustomerId = customerId;
            productSold.StoreId = storeId;
            productSold.DateSold = dateSold;
            shopContext.Entry(productSold).State = EntityState.Modified; ;
            shopContext.SaveChanges();
            return productSold;
        }

        public void Delete(int id)
        {
            ProductSold productSold = FindOne(id);
            shopContext.ProductSolds.Remove(productSold);
            shopContext.SaveChanges();
        }
    }
}