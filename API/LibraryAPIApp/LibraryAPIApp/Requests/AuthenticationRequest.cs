using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPIApp.Requests
{
    /// <summary>
    /// Класс для обработки запросов аутентификации
    /// </summary>
    public class AuthenticationRequest
    {
        public string email { get; set; }

        public string password { get; set; }
    }
}
