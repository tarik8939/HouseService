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
    public class AdvertisementFunctions : IAdvertisement
    {
        private readonly HouseDbContext _context;
        public AdvertisementFunctions()
        {
            _context = new HouseDbContext(HouseDbContext.ops.dbOptions);
        }
        public async Task<Advertisement> Create(Advertisement advertisement)
        {
            _context.Advertisements.Add(advertisement);
            advertisement.AdvertisementID = await _context.SaveChangesAsync();
            return advertisement;
        }

        public async Task<Boolean> Delete(int id)
        {
            var advertisement = await _context.Advertisements.FindAsync(id);
            if (advertisement == null)
            {
                return false;
            }

            _context.Advertisements.Remove(advertisement);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Advertisement> Edit(Advertisement advertisement)
        {
            _context.Entry(advertisement).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return advertisement;
        }
        //Не завантажувати Status
        public async Task<List<Advertisement>> GetAll()
        {
            List<Advertisement> ads = new List<Advertisement>();
            ads = await _context.Advertisements
                .Include(x => x.User)
                .Where(x=>x.StatusID==1)
                .ToListAsync(); 

            return ads;
        }

        public async Task<Advertisement> GetById(int id)
        {
            var advertisement = await _context.Advertisements
                .Include(x => x.User)
                .Include(x => x.Status)
                .Include(x=>x.Requests)
                .ThenInclude(x=>x.User)
                .FirstOrDefaultAsync(x => x.AdvertisementID == id);

            if (advertisement == null)
            {
                return null;
            }

            return advertisement;
        }

        public async Task<List<Advertisement>> GetByUser(int userId)
        {
            var advertisement = await _context.Advertisements
                .Include(x => x.User)
                .Include(x => x.Status)
                .Where(x => x.UserID == userId)
                .ToListAsync();

            if (advertisement == null)
            {
                return null;
            }

            return advertisement;
        }
    }
}
