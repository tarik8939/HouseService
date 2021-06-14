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

        [HttpGet("/GetReqByID/{id}")]
        public async Task<Request> GetRequest(int id)
        {
            var req = await _logic.GetById(id);
            return req;
        }

        [HttpGet("/GetReqByUserID/{id}")]
        public async Task<List<Request>> GetRequestByUserId(int id)
        {
            var reqList = await _logic.GetByUser(id);
            return reqList;
        }
        
        [HttpGet("/GetReqByAdID/{id}")]
        public async Task<List<Request>> GetRequestByAdId(int id)
        {
            var reqList = await _logic.GetByAdvertisement(id);
            return reqList;
        }
        
        [HttpPost("/CreateReq")]
        public async Task<Request> PostRequest(RequestDto request)
        {
            var req = await _logic.Create(request);
            return req;
        }
        
        [HttpDelete("/DeleteReq/{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            await _logic.Delete(id);
            return NoContent();
        }
        
        [HttpPut("/ChangeReqState/{id}")]
        public async Task<Request> ChangeStatus(int id, RequestDto request)
        {
            var req = await _logic.ChangeState(id, request);
            return req;
        }
    }
}