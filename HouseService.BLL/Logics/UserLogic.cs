using BCrypt.Net;
using HouseService.BLL.DTOs;
using HouseService.BLL.Helpers;
using HouseService.DAL.Functions;
using HouseService.DAL.Interfaces;
using HouseService.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.BLL.Logics
{
    public class UserLogic
    {
        private IUser users = new UserFunctions();
        private readonly JWTService _jwtService = new JWTService();
        public async Task<User> Register(RegisterDto dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PhoneNum = dto.PhoneNum,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                UserTypeID = dto.UserTypeID
            };
            var result = await this.users.Create(user);
            if (result.UserID > 0)
            {
                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await this.users.GetByEmail(email);

            if (user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<User> GetById(int id)
        {
            var user = await this.users.GetById(id);

            if (user == null)
            {
                return null;
            }

            return user;
        }
    }
}
