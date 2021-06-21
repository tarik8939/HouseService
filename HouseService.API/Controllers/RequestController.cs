using HouseService.BLL.Logics;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using HouseService.BLL.DTOs;

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
        public async Task<IActionResult> GetRequest(int id)
        {
            var req = await _logic.GetById(id);
            if (req != null)
            {
                return Ok(req);
            }
            return BadRequest(new { message = "Can't find request" });
        }

        [HttpGet("getByUserId/{id}")]
        public async Task<IActionResult> GetRequestByUserId(int id)
        {
            var reqList = await _logic.GetByUser(id);
            if (reqList != null)
            {
                return Ok(reqList);
            }
            return BadRequest(new { message = "Can't find requests for user" });
        }
        
        [HttpGet("getByAdId/{id}")]
        public async Task<IActionResult> GetRequestByAdId(int id)
        {
            var reqList = await _logic.GetByAdvertisement(id);
            if (reqList != null)
            {
                return Ok(reqList);
            }
            return BadRequest(new { message = "Can't find requests for ad" });
        }

        [HttpGet("getForUser/{userId}&{advertisementId}")]
        public async Task<IActionResult> GetForUserByAd(int userId, int advertisementId)
        {
            var req = await _logic.GetForUserByAd(userId, advertisementId);
            if (req != null)
            {
                return Ok(req);
            }
            return BadRequest(new { message = "Can't find request from this user" });
        }

        [HttpPost("create")]
        public async Task<IActionResult> PostRequest(RequestDto request)
        {
            var req = await _logic.Create(request);
            if (req != null)
            {
                return Created("success", req);
            }
            return BadRequest(new { message = "Request wasn't created" });
        }
        
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            await _logic.Delete(id);
            var res = await _logic.GetById(id);
            if (res == null)
            {
                return Ok(new { message = "Request was deleted" });
            }
            return BadRequest(new { message = "Request wasn't deleted" });
        }
        
        [HttpPut("changeState/{id}/{stateId}")]
        public async Task<IActionResult> ChangeStatus(int id, int stateId)
        {
            var req = await _logic.ChangeState(stateId, id);
            if (req != null)
            {
                return Created("success", req);
            }
            return BadRequest(new { message = "State wasn't changed" });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutRequest(int id, RequestDto request)
        {
            var req = await _logic.Edit(id, request);
            if (req != null)
            {
                return Created("success", req);
            }
            return BadRequest(new { message = "Request wasn't edited" });
        }
    }
}