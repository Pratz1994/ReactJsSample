using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;

namespace Shop.Services
{
    public interface ICustomerService
    {
        List<Customer> FindAll();
        Customer FindOne(int Id);
        Customer Save(Customer customer);
        Customer Update(Customer customer, string name, string address);
        void Delete(int id);
    }
}