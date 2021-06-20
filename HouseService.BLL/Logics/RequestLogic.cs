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
    public class RequestLogic
    {
        private IRequest requests = new RequestFunctions();


        public async Task<Request> Create(RequestDto dto)
        {
            var request = new Request
            {
                UserID = dto.UserID,
                AdvertisementID = dto.AdvertisementID,
                Comment = dto.Comment,
                StateID = 1
            };
            var result = await this.requests.Create(request);
            if (result.RequestID > 0)
            {
                return result;
            }
            else
            {
                return null;
            }
        }

        public async Task<Request> ChangeState(int stateId, int id)
        {
            var request = await this.requests.GetById(id);
            if (request != null)
            {
                request.StateID = stateId;
                var resad = await this.requests.Edit(request);
                if (stateId == 3)
                {
                    var requests = await this.requests.GetByAdvertisement(request.AdvertisementID);
                    foreach (var var in requests)
                    {
                        if (var.RequestID != resad.RequestID)
                        {
                            var.StateID = 2;
                            await this.requests.Edit(var);
                        }
                    }
                }
                return resad;
            }
            return null;
        }

        public async Task Delete(int id)
        {
            var request = await this.requests.GetById(id);
            if (request != null)
            {
                var res = await this.requests.Delete(id);
            }
        }

        public async Task<Request> GetById(int id)
        {
            var request = await this.requests.GetById(id);
            if (request == null)
            {
                return null;
            }
            return request;
        }

        public async Task<List<Request>> GetByUser(int userId)
        {
            var request = await this.requests.GetByUser(userId);
            if (request == null)
            {
                return null;
            }
            return request;
        }

        public async Task<List<Request>> GetByAdvertisement(int advertisementId)
        {
            var request = await this.requests.GetByAdvertisement(advertisementId);
            if (request == null)
            {
                return null;
            }
            return request;
        }

        public async Task<Request> GetForUserByAd(int userId, int advertisementId)
        {
            var request = await this.requests.GetForUserByAd(userId, advertisementId);
            if (request == null)
            {
                return null;
            }
            return request;
        }

        public async Task<Request> Edit(int id, RequestDto dto)
        {
            var req = await this.requests.GetById(id);
            if (req != null)
            {
                req.Comment = dto.Comment;
                var resreq = await this.requests.Edit(req);
                return resreq;
            }
            return null;
        }
    }
}
