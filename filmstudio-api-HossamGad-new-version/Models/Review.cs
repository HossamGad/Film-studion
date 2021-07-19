using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SFF_Api_App.Models
{
    public class Review
    {
        [Key]
        public int Id { get; set; }
        public int Grade { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public ICollection<Trivias> Trivia { get; set; } = new List<Trivias>();
    }
}
