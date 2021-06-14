using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Models
{
    public class Advertisement
    {
        public Advertisement()
        {
            Requests = new HashSet<Request>();
        }

        [Key]
        public int AdvertisementID { get; set; }
        [Required]
        public int UserID { get; set; }
        [Required]
        public int StatusID { get; set; }
        [Required]
        [MaxLength(75)]
        public string Name { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        [MaxLength(75)]
        public string Address { get; set; }
        public virtual User User { get; set; }
        public virtual Status Status { get; set; }

        public virtual HashSet<Request> Requests { get; set; }
    }
}
