using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Shop.DAL;
using Shop.Models;
using Shop.Services;

namespace Shop.Controllers
{
    public class ProductSoldDto
    {
        public int product_id { get; set; }
        public int customer_id { get; set; }
        public int store_id { get; set; }
        public DateTime date_sold { get; set; }
    }

    public class ProductSoldsController : Controller
    {
        private IProductSoldService productSoldService;

        public ProductSoldsController()
        {
            this.productSoldService = new ProductSoldService(new ShopContext());;
        }

        private string toJson(object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }

        private ContentResult toContent(object obj)
        {
            return Content(toJson(obj), "application/json");
        }

        // GET: Stores
        public ActionResult ReadAll()
        {
            return Content(toJson(productSoldService.FindAll()));
        }

        public ActionResult Create(ProductSoldDto dto)
        {
            ProductSold productSold = ProductSold.Of(productId: dto.product_id, 
                customerId: dto.customer_id,
                storeId: dto.store_id);
            productSoldService.Save(productSold);
            return Content(toJson(productSold));
        }

        // GET: Stores/Details/5

        public ActionResult Update(int? id, ProductSoldDto dto)
        {
            var productSold = productSoldService.FindOne(id.Value);
            if (productSold == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                return toContent(productSoldService.Update(productSold, productId:dto.product_id, customerId:dto.customer_id,
                    storeId:dto.store_id, dateSold:dto.date_sold));
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }

        public ActionResult Delete(int? id)
        {
            var store = productSoldService.FindOne(id.Value);
            if (store == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                productSoldService.Delete(id.Value);
                return toContent(new { id = id.Value });
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }


    }
}