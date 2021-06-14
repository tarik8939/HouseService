using HouseService.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Interfaces
{
    public interface IUser
    {
        User Create(User user);
        User GetByEmail(string email);

        User GetById(int id);
    }
}
