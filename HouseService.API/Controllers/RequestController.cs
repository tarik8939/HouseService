using HouseService.BLL.Logics;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using HouseService.BLL.DTOs;
using HouseService.DAL.Models;

namespace HouseService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private RequestLogic _logic;

        public RequestController(RequestLogic logic)
        {
            _logic = logic;
        }

        [HttpGet("getById/{id}")]
        public async Task<Request> GetRequest(int id)
        {
            var req = await _logic.GetById(id);
            return req;
        }

        [HttpGet("getByUserId/{id}")]
        public async Task<List<Request>> GetRequestByUserId(int id)
        {
            var reqList = await _logic.GetByUser(id);
            return reqList;
        }
        
        [HttpGet("getByAdId/{id}")]
        public async Task<List<Request>> GetRequestByAdId(int id)
        {
            var reqList = await _logic.GetByAdvertisement(id);
            return reqList;
        }

        [HttpGet("getForUser/{userId}&{advertisementId}")]
        public async Task<Request> GetForUserByAd(int userId, int advertisementId)
        {
            var req = await _logic.GetForUserByAd(userId, advertisementId);
            return req;
        }

        [HttpPost("create")]
        public async Task<Request> PostRequest(RequestDto request)
        {
            var req = await _logic.Create(request);
            return req;
        }
        
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            await _logic.Delete(id);
            return NoContent();
        }
        
        [HttpPut("changeState/{id}/{stateId}")]
        public async Task<Request> ChangeStatus(int id, int stateId)
        {
            var req = await _logic.ChangeState(stateId, id);
            return req;
        }
    }
}