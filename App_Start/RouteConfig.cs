using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Shop
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "JsHome",
                url: "",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "JsHandleCustomers",
                url: "Customers/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "JsHandleProducts",
                url: "Products/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "JsHandleStores",
                url: "Stores/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "JsHandleProductsSold",
                url: "ProductSolds/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "ReadAll",
                url: "api/{controller}",
                defaults: new { action = "ReadAll" },
                constraints: new { httpMethod = new HttpMethodConstraint("GET") }
            );

            routes.MapRoute(
                name: "Read",
                url: "api/{controller}/{id}",
                defaults: new { action = "Read" },
                constraints: new { httpMethod = new HttpMethodConstraint("GET") }
            );

            routes.MapRoute(
                name: "Create",
                url: "api/{controller}",
                defaults: new { action = "Create" },
                constraints: new { httpMethod = new HttpMethodConstraint("POST") }
            );

            routes.MapRoute(
                name: "Update",
                url: "api/{controller}/{id}",
                defaults: new { action = "Update" },
                constraints: new { httpMethod = new HttpMethodConstraint("PUT") }
            );

            routes.MapRoute(
                name: "Delete",
                url: "api/{controller}/{id}",
                defaults: new { action = "Delete" },
                constraints: new { httpMethod = new HttpMethodConstraint("DELETE") }
            );

        }
    }
}
