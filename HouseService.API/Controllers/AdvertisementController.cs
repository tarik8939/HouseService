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
    public class AdvertisementController : ControllerBase
    {
        private AdvertisementLogic _logic;

        public AdvertisementController(AdvertisementLogic logic)
        {
            _logic = logic;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAdvertisement()
        {
            var adlist = await _logic.GetAll();
            if (adlist != null)
            {
                return Ok(adlist);
            }
            return BadRequest(new { message = "Can't find ads" });
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetAdvertisementById(int id)
        {
            var ad = await _logic.GetById(id);
            if (ad != null)
            {
                return Ok(ad);
            }
            return BadRequest(new { message = "Can't find ad" });
        }

        [HttpGet("getByUserId/{id}")]
        public async Task<IActionResult> GetAdvertisementByUserId(int id)
        {
            var adlist = await _logic.GetByUser(id);
            if (adlist != null)
            {
                return Ok(adlist);
            }
            return BadRequest(new { message = "Can't find ads for user" });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> PutAdvertisement(int id, AdvertisementDto advertisement)
        {
            var ad = await _logic.Edit(id, advertisement);
            if (ad != null)
            {
                return Created("success", ad);
            }
            return BadRequest(new { message = "Ad wasn't edited" });
        }

        // [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> PostAdvertisement(AdvertisementDto advertisement)
        {
            var ad = await _logic.Create(advertisement);
            if (ad != null)
            {
                return Created("success", ad);
            }
            return BadRequest(new { message = "Ad wasn't created" });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            await _logic.Delete(id);
            var res = await _logic.GetById(id);
            if (res==null)
            {
                return Ok(new { message = "Ad was deleted" });
            }
            return BadRequest(new { message = "Ad wasn't deleted" });
        }

        [HttpPut("changeStatus/{id}/{statusId}")]
        public async Task<IActionResult> ChangeStatus(int statusId, int id)
        {
            var ad = await _logic.ChangeStatus(statusId, id);
            if (ad != null)
            {
                return Created("success", ad);
            }
            return BadRequest(new { message = "Ad status wasn't changed" });
        }

        [HttpPut("changeRating/{advertisementId}/{userId}/{mark}")]
        public async Task<IActionResult> ChangeRating(int advertisementId, int mark)
        {
            var user = await _logic.ChangeRating(mark, advertisementId);
            if (user != null)
            {
                return Created("rating was applied", user);
            }
            return BadRequest(new { message = "rating wasn't applied" });
        }
    }
}