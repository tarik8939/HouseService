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
                PhoneNum = dto.PhoneNumber,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                UserTypeID = dto.UserTypeID
            };
            if (user.UserTypeID == 2)
            {
                user.MarkCount = 0;
                user.Rating = 0;
            }
            var check = await this.users.GetByEmail(dto.Email);
            if (check==null)
            {
                await this.users.Create(user);
                var result = await this.GetByEmail(dto.Email);
                if (result != null)
                {
                    return result;
                }
            }
            return null;
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
