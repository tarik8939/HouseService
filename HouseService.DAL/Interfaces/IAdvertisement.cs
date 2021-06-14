using HouseService.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Interfaces
{
    public interface IAdvertisement
    {
        Task<Advertisement> Create(Advertisement advertisement);
        Task<List<Advertisement>> GetAll();
        Task<Advertisement> GetById(int id);
        Task<Advertisement> Edit(Advertisement advertisement);
        Task<Boolean> Delete(int id);
        Task<List<Advertisement>> GetByUser(int userId);

    }
}
