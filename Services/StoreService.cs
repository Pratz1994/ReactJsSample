using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Shop.DAL;
using Shop.Models;

namespace Shop.Services
{
    public class StoreService: IStoreService
    {
        private ShopContext shopContext;

        public StoreService(ShopContext _context)
        {
            this.shopContext = _context;
        }

        public List<Store> FindAll()
        {
            return shopContext.Stores.ToList();
        }

        public Store FindOne(int id)
        {
            return shopContext.Stores.Find(id);
        }

        public Store Save(Store store)
        {
            try
            {
                shopContext.Stores.Add(store);
                shopContext.SaveChanges();
                return store;
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

        public Store Update(Store store, string name, string address)
        {
            store.Address = address;
            store.Name = name;
            shopContext.Entry(store).State = EntityState.Modified;;
            shopContext.SaveChanges();
            return store;
        }

        public void Delete(int Id)
        {
            Store store = shopContext.Stores.Find(Id);
            shopContext.Stores.Remove(store);
            shopContext.SaveChanges();
        }

        public void Dispose()
        {
            shopContext.Dispose();
        }
    }
}