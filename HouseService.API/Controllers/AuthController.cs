using HouseService.BLL.DTOs;
using HouseService.BLL.Helpers;
using HouseService.BLL.Logics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HouseService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private UserLogic _logic;
        private JWTService _jwtService;
        public AuthController(UserLogic logic, JWTService jwtService)
        {
            _logic = logic;
            _jwtService = jwtService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = await _logic.Register(dto);
            if (user != null)
            {
                return Created("success", user);
            }
            else
                return BadRequest(new { message = "There was a problem registering" });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _logic.GetByEmail(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            if(!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtService.Generate(user.UserID);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                MaxAge = new TimeSpan(1, 5, 3)
            }) ;
            return Ok(user);
        }
        [HttpGet("user")]
        public async Task<IActionResult> UserCheck()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = await _logic.GetById(userId);
                return Ok(user);
            }
            catch(Exception)
            {
                return Unauthorized();
            }


        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Append("jwt", "logout", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                MaxAge = new TimeSpan(1)
            });
            return Ok(new
            {
                message = "success"
            });
        }
    }
}
