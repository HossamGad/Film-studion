using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SFF_Api_App.DB;
using SFF_Api_App.Models;

namespace SFF_Api_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudiosApiController : ControllerBase
    {
        private readonly SFF_DbContext _context;

        public StudiosApiController(SFF_DbContext context)
        {
            _context = context;
        }

        // GET: Studios
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.Studios.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Studio>> GetStudios(int id)
        {
            var studio = await _context.Studios.FindAsync(id);

            if (studio == null)
            {
                return NotFound("Kunde inte hitta studio");
            }

            return Ok(studio);
        }

        [HttpPut("{StudioId}")]
        public async Task<IActionResult> UpdateStudio(int StudioId, Studio studio)
        {
            if (StudioId != studio.StudioId)
            {
                return BadRequest("Filmen finns inte");
            }

            var getStudio = await _context.Studios.FindAsync(StudioId);
            if (getStudio == null)
            {
                return NotFound();
            }

            getStudio.StudioId = studio.StudioId;
            getStudio.Name = studio.Name;
            getStudio.Ort = studio.Ort;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return NotFound("Kunde inte lagra studion");
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Studio>> CreateMovie(Studio studio)
        {
            try
            {
                var newStudio = new Studio
                {
                   
                    StudioId = studio.StudioId,
                    Name = studio.Name,
                    Ort = studio.Ort,
                };

                _context.Studios.Add(newStudio);
                await _context.SaveChangesAsync();

                return Ok(newStudio);
            }
            catch
            {
                return BadRequest("Databas fel");
            }

        }

        [HttpDelete("{studioId}")]
        public async Task<IActionResult> DeleteStudio(int studioId)
        {
            var studio = await _context.Studios.FindAsync(studioId);

            if (studio == null)
            {
                return NotFound("Kunde inte hitta studion");
            }

            _context.Studios.Remove(studio);
            await _context.SaveChangesAsync();

            return NoContent();
        }


    }
}
