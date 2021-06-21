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
    public class RequestFunctions : IRequest
    {
        private readonly HouseDbContext _context;
        public RequestFunctions()
        {
            _context = new HouseDbContext(HouseDbContext.ops.dbOptions);
        }
        public async Task<Request> Create(Request request)
        {
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<bool> Delete(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return false;
            }

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Request> Edit(Request request)
        {
            _context.Entry(request).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<List<Request>> GetByAdvertisement(int advertisementId)
        {
            var request = await _context.Requests
               .Include(x => x.User)
               .Include(x => x.State)
               .Where(x => x.AdvertisementID == advertisementId)
               .ToListAsync();

            if (request == null)
            {
                return null;
            }

            return request;
        }

        public async Task<Request> GetById(int id)
        {
            var request = await _context.Requests
                .Include(x => x.User)
                .Include(x => x.Advertisement)
                .Include(x => x.State)
                .FirstOrDefaultAsync(x => x.RequestID == id);

            if (request == null)
            {
                return null;
            }

            return request;
        }

        public async Task<List<Request>> GetByUser(int userId)
        {
            var request = await _context.Requests
               .Include(x => x.User)
               .Include(x=>x.State)
               .Include(x => x.Advertisement)
               .Where(x => x.UserID == userId)
               .ToListAsync();

            if (request == null)
            {
                return null;
            }

            return request;
        }

        public async Task<Request> GetForUserByAd(int userId, int advertisementId)
        {
            var request = await _context.Requests
                 .Include(x => x.State)
                 .FirstOrDefaultAsync(x => x.AdvertisementID == advertisementId && x.UserID == userId);

            if (request == null)
            {
                return null;
            }

            return request;

        }
    }
}
