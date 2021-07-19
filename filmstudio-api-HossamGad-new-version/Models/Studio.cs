using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SFF_Api_App.Models
{
    public class Studio
    {
        [Key]
        public int StudioId { get; set; }
        public string Name { get; set; }
        
        public string Ort { get; set; }

        public ICollection<Movie> Movies { get; set; } = new List<Movie>();
    }
}
