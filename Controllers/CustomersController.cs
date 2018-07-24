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
    public class CustomerDto
    {
        public string name { get; set; }
        public string address { get; set; }
    }

    public class CustomersController : Controller
    {
        private ICustomerService customerService;
        public CustomersController()
        {
            this.customerService = new CustomerService(new ShopContext());
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
            return Content(toJson(customerService.FindAll()));
        }

        public ActionResult Create(CustomerDto dto)
        {
            Customer customer = Customer.FromNameAndAddress(dto.name, dto.address);
            customerService.Save(customer);
            return Content(toJson(customer));
        }

        public ActionResult Update(int? id, CustomerDto dto)
        {
            var product = customerService.FindOne(id.Value);
            if (product == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                return toContent(customerService.Update(product, name: dto.name, address: dto.address));
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }

        public ActionResult Delete(int? id)
        {
            var store = customerService.FindOne(id.Value);
            if (store == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                customerService.Delete(id.Value);
                return toContent(new { id = id.Value });
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }
    }
}