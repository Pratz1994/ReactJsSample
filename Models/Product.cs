using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Shop.Models
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        [Required]
        public string Name { get; set; }
        [JsonProperty("price")]
        [Required]
        public double Price { get; set; }

        public static Product fromNameAndPrice(string name, double price)
        {
            Product product = new Product();
            product.Name = name;
            product.Price = price;
            return product;
        }

    }
}