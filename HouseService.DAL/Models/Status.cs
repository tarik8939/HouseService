using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Models
{
    public class Status
    {

        public Status()
        {
            Advertisements = new HashSet<Advertisement>();
        }

        [Key]
        public int StatusID { get; set; }
        [Required]
        public string StatusName { get; set; }

        public virtual ICollection<Advertisement> Advertisements { get; set; }
    }
}
