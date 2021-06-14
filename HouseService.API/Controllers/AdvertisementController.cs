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

        [HttpGet("/GetAllAds")]
        public async Task<ICollection<Advertisement>> GetAdvertisement()
        {
            var adlist = await _logic.GetAll();
            return adlist;
        }

        [HttpGet("/GetAdByID/{id}")]
        public async Task<Advertisement> GetAdvertisementById(int id)
        {
            var adlist = await _logic.GetById(id);
            return adlist;
        }

        [HttpGet("/GetAdsByUserID/{id}")]
        public async Task<List<Advertisement>> GetAdvertisementByUserId(int id)
        {
            var adlist = await _logic.GetByUser(id);
            return adlist;
        }

        [HttpPut("/EditAd/{id}")]
        public async Task<Advertisement> PutAdvertisement(int id, AdvertisementDto advertisement)
        {
            var ad = await _logic.Edit(id, advertisement);
            return ad;
        }

        // [Authorize]
        [HttpPost("/CreateAd")]
        public async Task<Advertisement> PostAdvertisement(AdvertisementDto advertisement)
        {
            var ad = await _logic.Create(advertisement);
            return ad;
        }

        [HttpDelete("/DeleteAd/{id}")]
        public async Task<IActionResult> DeleteAdvertisement(int id)
        {
            await _logic.Delete(id);
            return NoContent();
        }

        [HttpPut("/ChangeAdStatus/{id}")]
        public async Task<Advertisement> ChangeStatus(int id, AdvertisementDto advertisement)
        {
            var ad = await _logic.ChangeStatus(id, advertisement);
            return ad;
        }
    }
}