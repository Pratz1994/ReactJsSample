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
    public class ProductDto
    {
        public string name { get; set; }
        public double price { get; set; }
    }

    public class ProductsController : Controller
    {
        private IProductService productService;

        public ProductsController()
        {
            this.productService = new ProductService(new ShopContext());
        }

        private string toJson(object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }

        private ContentResult toContent(object obj)
        {
            return Content(toJson(obj), "application/json");
        }

        public ActionResult ReadAll()
        {
            return Content(toJson(productService.FindAll()));
        }

        public ActionResult Create(ProductDto dto)
        {
            Product product = Product.fromNameAndPrice(dto.name, dto.price);
            productService.Save(product);
            return Content(toJson(product));
        }

        public ActionResult Update(int? id, ProductDto dto)
        {
            var product = productService.FindOne(id.Value);
            if (product == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                return toContent(productService.Update(product, name:dto.name, price:dto.price));
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }

        public ActionResult Delete(int? id)
        {
            var store = productService.FindOne(id.Value);
            if (store == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                productService.Delete(id.Value);
                return toContent(new { id = id.Value });
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }
    }
}