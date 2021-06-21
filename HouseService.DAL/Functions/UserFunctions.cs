using HouseService.DAL.Data;
using HouseService.DAL.Interfaces;
using HouseService.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Functions
{
    public class UserFunctions : IUser
    {
        private readonly HouseDbContext _context;
        public UserFunctions()
        {
            _context = new HouseDbContext(HouseDbContext.ops.dbOptions);
        }

        public async Task<User> Create(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetByEmail(string email)
        {
            var user = await _context.Users.Include(x => x.UserType)
                .FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<User> GetById(int id)
        {
            var user = await _context.Users.Include(x => x.UserType)
                .FirstOrDefaultAsync(x => x.UserID == id);

            if (user == null)
            {
                return null;
            }

            return user;
        }
    }
}
