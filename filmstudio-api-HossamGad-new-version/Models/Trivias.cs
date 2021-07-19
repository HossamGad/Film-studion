using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SFF_Api_App.Models
{
    public class Trivias
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public Movie Movie { get; set; }
    }
}
