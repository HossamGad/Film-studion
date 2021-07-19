using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SFF_Api_App.Models
{
    public class Rental
    {
        [Key]
        public int RentalId { get; set; }
        public DateTime DateRented { get; set; }
        public int MovieNumber { get; set; }
        public string MovieName { get; set; }
        public int StudioNumber { get; set; }
        public string StudioName { get; set; }
    }
}
