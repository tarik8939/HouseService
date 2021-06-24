using HouseService.BLL.DTOs;
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
    public class AdvertisementLogic
    {
        private IAdvertisement ads = new AdvertisementFunctions();
        private IUser users = new UserFunctions();
        private IRequest requests = new RequestFunctions();

        public async Task<ICollection<Advertisement>> GetAll()
        {
            var ads = await this.ads.GetAll();
            if (ads.Count > 0)
                return ads;
            else
                return null;
        }

        public async Task<Advertisement> Create(AdvertisementDto dto)
        {
            var ad = new Advertisement
            {
                UserID = dto.UserID,
                Name = dto.Name,
                Description = dto.Description,
                Address = dto.Address,
                Price = dto.Price,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                StatusID = 1,
            };
            var result = await this.ads.Create(ad);
            if (result.AdvertisementID > 0)
            {
                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<Advertisement> Edit(int id, AdvertisementDto dto)
        {
            var ad = await this.ads.GetById(id);
            if (ad != null)
            {
                ad.Name = dto.Name;
                ad.Description = dto.Description;
                ad.Address = dto.Address;
                ad.Price = dto.Price;
                ad.StartDate = dto.StartDate;
                ad.EndDate = dto.EndDate;
                var resad = await this.ads.Edit(ad);
                return resad;
            }
            return null;
        }

        public async Task<Advertisement> ChangeStatus(int statusId, int id)
        {
            var ad = await this.ads.GetById(id);
            if (ad != null)
            {
                ad.StatusID = statusId;
                var resad = await this.ads.Edit(ad);
                return resad;
            }
            return null;
        }

        public async Task Delete(int id)
        {
            var ad = await this.ads.GetById(id);
            if (ad != null)
            {
                var res = await this.ads.Delete(id);
            }
        }

        public async Task<Advertisement> GetById(int id)
        {
            var ad = await this.ads.GetById(id);
            if (ad == null)
            {
                return null;
            }
            return ad;
        }

        public async Task<List<Advertisement>> GetByUser(int userId)
        {
            var ad = await this.ads.GetByUser(userId);
            if (ad == null)
            {
                return null;
            }
            return ad;
        }

        public async Task<User> ChangeRating(int mark, int advertisementId)
        {
            var ad = await this.ads.GetById(advertisementId);
            if (ad.StatusID != 3)
            {
                return null;
            }
            var req = await this.requests.GetByAdvertisement(advertisementId);
            Request resreq = null;
            foreach(var r in req)
            {
                if (r.StateID == 3)
                {
                    resreq = r;
                }
            }
            if(resreq == null)
            {
                return null;
            }
            var user = await this.users.GetById((int)resreq.UserID);

            var resultRating = ((user.Rating * user.MarkCount) + mark) / (user.MarkCount + 1);

            user.Rating = resultRating;
            user.MarkCount += 1;

            var resuser = await this.users.Edit(user);

            if (resuser != null)
            {
                await this.ChangeStatus(4, advertisementId);
                return resuser;
            }
            return null;
        }
    }
}
