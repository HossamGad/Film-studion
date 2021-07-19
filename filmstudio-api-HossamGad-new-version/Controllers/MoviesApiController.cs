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
    public class MoviesApiController : ControllerBase
    {
        private readonly SFF_DbContext _context;

        public MoviesApiController(SFF_DbContext context)
        {
            _context = context;
        }

        // GET: Movies
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.Movies.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetTodoItem(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound("Kunde inte hitta film");
            }

            return Ok(movie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest("Filmen finns inte");
            }

            var getMovie = await _context.Movies.FindAsync(id);
            if (getMovie == null)
            {
                return NotFound();
            }

                getMovie.Title = movie.Title;
                getMovie.Genre = movie.Genre;
                getMovie.Stock = movie.Stock;
                getMovie.StudioName = movie.StudioName;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch 
            {
                return NotFound("Kunde inte lagra filmen");
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Movie>> CreateMovie(Movie movie)
        {
            try {
                var newMovie = new Movie
                {
                    Title = movie.Title,
                    Genre = movie.Genre,
                    Stock = movie.Stock,
                    StudioName = movie.StudioName
                };

                _context.Movies.Add(newMovie);
                await _context.SaveChangesAsync();

                return Ok(newMovie);
            }
            catch
            {
                return BadRequest("Databas fel");
            }
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound("Kunde inte hitta filmen");
            }

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
