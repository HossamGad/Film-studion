using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SFF_Api_App.DB;
using SFF_Api_App.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SFF_Api_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalServiceApiController : ControllerBase
    {
        private readonly SFF_DbContext _context;

        public RentalServiceApiController(SFF_DbContext context)
        {
            _context = context;
        }

        // GET: Rentals
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return Ok(await _context.Rentals.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Rental>> CreateRental(Rental rental)
        {
            try
            {
                var newRental = new Rental
                {

                    RentalId = rental.RentalId,
                    DateRented = rental.DateRented,
                    MovieNumber = rental.MovieNumber,
                    MovieName = rental.MovieName,
                    StudioNumber = rental.StudioNumber,
                    StudioName = rental.StudioName,

                };

                _context.Rentals.Add(newRental);
                await _context.SaveChangesAsync();

                return Ok(newRental);
            }
            catch
            {
                return BadRequest("Databas fel");
            }
        }

        [HttpDelete("{rentalId}")]
        public async Task<IActionResult> DeleteStudio(int rentalId)
        {
            var rental = await _context.Rentals.FindAsync(rentalId);

            if (rental == null)
            {
                return NotFound("Kunde inte hitta utlånningen");
            }

            _context.Rentals.Remove(rental);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
