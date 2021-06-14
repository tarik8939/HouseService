using HouseService.BLL.Logics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HouseService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        [Route("api/[controller]")]
        [ApiController]
        public class AuthController : ControllerBase
        {
            private AdvertisementLogic _logic;
            public AuthController(AdvertisementLogic logic)
            {
                _logic = logic;
            }
            [HttpGet("all")]
            public async Task<ActionResult> GetAdvertisement()
            {
                var adlist = await _logic.GetAll();
            }

            // GET: api/Advertisements/5
            [HttpGet("{id}")]
            public async Task<ActionResult> GetAdvertisement(int id)
            {
                //var advertisement = await _context.Advertisement.FindAsync(id);
                var advertisement = await _context.Advertisement
                    .Include(x => x.User)
                    .Include(x => x.Requests)
                    .Include(x => x.Status)
                    .FirstOrDefaultAsync(x => x.AdvertisementID == id);

                if (advertisement == null)
                {
                    return NotFound();
                }

                return advertisement;
            }

            // PUT: api/Advertisements/5
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPut("{id}")]
            public async Task<IActionResult> PutAdvertisement(int id, Advertisement advertisement)
            {
                if (id != advertisement.AdvertisementID)
                {
                    return BadRequest();
                }

                _context.Entry(advertisement).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AdvertisementExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // POST: api/Advertisements
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            // [Authorize]
            [HttpPost]
            public async Task<ActionResult<Advertisement>> PostAdvertisement(Advertisement advertisement)
            {
                advertisement.StatusID = (_context.Status.FirstOrDefault(x => x.StatusName == "Published")).StatusID;
                _context.Advertisement.Add(advertisement);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAdvertisement", new { id = advertisement.AdvertisementID }, advertisement);
            }

            // DELETE: api/Advertisements/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteAdvertisement(int id)
            {
                var advertisement = await _context.Advertisement.FindAsync(id);
                if (advertisement == null)
                {
                    return NotFound();
                }

                _context.Advertisement.Remove(advertisement);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool AdvertisementExists(int id)
            {
                return _context.Advertisement.Any(e => e.AdvertisementID == id);
            }
        }
    }
}
