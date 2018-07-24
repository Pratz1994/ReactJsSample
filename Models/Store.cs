using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Shop.Models
{
    public class Store
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        [Required]
        public string Name { get; set; }
        [JsonProperty("address")]
        [Required]
        public string Address { get; set; }

        public static Store FromNameAndAddress(string name, string address)
        {
            Store store = new Store();
            store.Name = name;
            store.Address = address;
            return store;
        }

    }
}