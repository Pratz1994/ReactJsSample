using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;

namespace Shop.Services
{
    public interface IProductSoldService
    {
        List<ProductSold> FindAll();
        ProductSold FindOne(int Id);
        ProductSold Save(ProductSold productSold);
        ProductSold Update(ProductSold productSold, int productId, int customerId, int storeId,  DateTime dateSold);
        void Delete(int id);
    }
}