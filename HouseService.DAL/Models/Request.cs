using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Models
{
    public class Request
    {
        [Key]
        public int RequestID { get; set; }
        public int? UserID { get; set; }
        [Required]
        [MaxLength(200)]
        public string Comment { get; set; }
        [Required]
        public int AdvertisementID { get; set; }
        [Required]
        public int StateID { get; set; }

        public virtual User User { get; set; }
        public virtual Advertisement Advertisement { get; set; }
        public virtual State State { get; set; }
    }
}
