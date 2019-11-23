using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using LibraryAPIApp.Models;
using LibraryAPIApp.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LibraryAPIApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        /// <summary>
        /// Контекст
        /// </summary>
        private LibraryContext _libraryContext;

        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="libraryContext"></param>
        public AuthenticationController(LibraryContext libraryContext)
        {
            _libraryContext = libraryContext;
        }

        // POST: api/Authentication
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Post(AuthenticationRequest request)
        {
            var token = Authenticate(request);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized();
            }

            return Ok(token);
        }

        // POST: api/Authentication на основе токена
        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get(string token)
        {
            var user = Authenticate(token);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        /// <summary>
        /// Проверка пользователя
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        private string Authenticate(AuthenticationRequest request)
        {
            User user = _libraryContext.Users.Include("Role").FirstOrDefault(x => x.Email == request.email && x.Password == request.password);
            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("0d5b3235a8b403c3dab9c3f4f65c07fcalskd234n1k41230");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.Name)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        /// <summary>
        /// Проверка пользователя
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        private User Authenticate(string request)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("0d5b3235a8b403c3dab9c3f4f65c07fcalskd234n1k41230");
                var validations = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero

                };
                var claims = tokenHandler.ValidateToken(request, validations, out var securityToken);
                var email = claims.Claims.First(c => c.Type == ClaimTypes.Email).Value;
                return _libraryContext.Users.First(u => u.Email == email);
            }
            catch(SecurityTokenExpiredException)
            {
                return null;
            }            
        }
    }
}
