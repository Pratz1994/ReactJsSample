using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Shop.Services
{

    public class MyValidationError : Exception
    {
        public MyValidationError()
        {
        }

        public MyValidationError(string message)
            : base(message)
        {
        }

        public MyValidationError(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}