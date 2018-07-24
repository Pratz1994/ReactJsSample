using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Shop.Models;

namespace Shop.Services
{
    public interface IStoreService: IDisposable
    {
        List<Store> FindAll();
        Store FindOne(int Id);
        Store Save(Store store);
        Store Update(Store store, string name, string address);
        void Delete(int Id);
    }
}