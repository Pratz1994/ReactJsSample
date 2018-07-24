using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Shop.Models
{
    public class ProductSold
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("product_id")]
        [Required]
        public int ProductId { get; set; }
        public Product Product { get; set; }

        [JsonProperty("customer_id")]
        [Required]
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        [JsonProperty("store_id")]
        [Required]
        public int StoreId { get; set; }
        public Store Store { get; set; }

        [JsonProperty("date_sold")]
        [Required]
        public DateTime DateSold { get; set; }

        public static ProductSold Of(int productId, int customerId, int storeId, DateTime dateSold)
        {
            return new ProductSold()
            {
                ProductId = productId,
                CustomerId = customerId,
                StoreId = storeId,
                DateSold = dateSold
            };
        }

        public static ProductSold Of(int productId, int customerId, int storeId)
        {
            return Of(productId, customerId, storeId, DateTime.Now);
        }

    }
}