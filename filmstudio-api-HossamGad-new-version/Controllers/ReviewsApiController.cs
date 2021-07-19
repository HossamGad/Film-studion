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
    public class ReviewsApiController : Controller
    {
        private readonly SFF_DbContext _context;

        public ReviewsApiController(SFF_DbContext context)
        {
            _context = context;
        }

        // GET: Reviews
        [HttpGet]
        public async Task<IActionResult> GetReviews()
        {
            return Ok(await _context.Reviews.Include(m => m.Movie).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetTodoItem(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound("Kunde inte hitta film");
            }

            return Ok(review);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReview(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest("finns inte");
            }

            var getReview = await _context.Reviews.FindAsync(id);
            if (getReview == null)
            {
                return NotFound();
            }

            getReview.Id = review.Id;
            getReview.Grade = review.Grade;
            getReview.MovieId = review.MovieId;

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
        public async Task<ActionResult<Movie>> CreateReview(Review review)
        {
            try
            {
                var newReview = new Review
                {
                    Grade = review.Grade,
                    MovieId = review.MovieId,
                };

                _context.Reviews.Add(newReview);
                await _context.SaveChangesAsync();

                return Ok(newReview);
            }
            catch
            {
                return BadRequest("Databas fel");
            }

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound("Kunde inte hitta filmen");
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
