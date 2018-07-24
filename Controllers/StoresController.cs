using System.Data.Entity.Validation;
using System.Net;
using System.Web.Mvc;
using Newtonsoft.Json;
using Shop.DAL;
using Shop.Models;
using Shop.Services;

namespace Shop.Controllers
{
    public class StoreDto
    {
        public string name { get; set; }
        public string address { get; set; }
    }
    public class StoresController : Controller
    {
        private IStoreService storeService;

        public StoresController()
        {
            this.storeService = new StoreService(new ShopContext());
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
            //return Json(db.Stores.ToList(), JsonRequestBehavior.AllowGet);
            return toContent(storeService.FindAll());
        }

        // GET: Stores/Details/5
        public ActionResult Read(int? id)
        {
            return toContent(storeService.FindOne(id.Value));
        }
        // POST: Stores
        public ActionResult Create(StoreDto dto)
        {
            Store store = Store.FromNameAndAddress(dto.name, dto.address);
            try
            {
                return toContent(storeService.Save(store));
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }

        public ActionResult Update(int? id, StoreDto dto)
        {
            var store = storeService.FindOne(id.Value);
            if (store == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                return toContent(storeService.Update(store, dto.name, dto.address));
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }

        public ActionResult Delete(int? id)
        {
            var store = storeService.FindOne(id.Value);
            if (store == null)
            {
                return HttpNotFound($"id ${id} not found");
            }
            try
            {
                storeService.Delete(id.Value);
                return toContent(new {id = id.Value});
            }
            catch (DbEntityValidationException e)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, e.Message);
            }
        }


    }
}
