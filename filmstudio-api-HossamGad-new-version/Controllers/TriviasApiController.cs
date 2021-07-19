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
    [Route("api/MoviesApi/{id}/TriviasApi")]
    [ApiController]
    public class TriviasApiController : ControllerBase
    {
        private readonly SFF_DbContext _context;

        public TriviasApiController(SFF_DbContext context)
        {
            _context = context;
        }

        // GET: Trivias
        [HttpGet]
        public async Task<IActionResult> GetTrivia(int id)
        {
            try {

                var trivia = await _context.Trivias.FirstOrDefaultAsync(m => m.Movie.Id == id);

                if(trivia == null)
                {
                    return NotFound("Kunde inte hitta trivia");
                }

                return Ok(trivia);
            } 
            catch 
            {
                return NotFound("Kunde inte hitta trivia");
            }   
        }

        [HttpGet("{triviaId}")]
        public async Task<ActionResult<Trivias>> GetTodoItem(int triviaId)
        {
            var trivias = await _context.Trivias.FindAsync(triviaId);

            if (trivias == null)
            {
                return NotFound("Kunde inte hitta film");
            }

            return Ok(trivias);
        }

        
        [HttpPost]
        public async Task<ActionResult<Trivias>> CreateTrivia(int id, Trivias trivias)
        {
            try
            {
                var movie = await _context.Movies.FindAsync(id);

                var newTrivias = new Trivias
                {
                    Title = trivias.Title,
                    Movie = movie 
                };

                _context.Trivias.Add(newTrivias);
                await _context.SaveChangesAsync();

                return Ok(newTrivias);
            }
            catch
            {
                return BadRequest("Databas fel");
            }

        }
        
        [HttpDelete("{triviaId}")]
        public async Task<IActionResult> DeleteTrivias(int triviaId)
        {
            var trivias = await _context.Trivias.FindAsync(triviaId);

            if (trivias == null)
            {
                return NotFound("Kunde inte hitta filmen");
            }

            _context.Trivias.Remove(trivias);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
    }
}
