using HouseService.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Interfaces
{
    public interface IRequest
    {
        Task<Request> Create(Request request);
        Task<Request> GetById(int id);
        Task<Request> Edit(Request request);
        Task<Boolean> Delete(int id);
        Task<List<Request>> GetByUser(int userId);
        Task<List<Request>> GetByAdvertisement(int advertisementId);
        Task<Request> GetForUserByAd(int userId, int advertisementId);

    }
}
