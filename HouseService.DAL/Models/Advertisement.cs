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
        public int UserID { get; set; }
        public int StatusID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        public int Price { get; set; }
        public string Address { get; set; }
        [ForeignKey("UserID")]
        public virtual User User { get; set; }
        [ForeignKey("StatusID")]
        public virtual Status Status { get; set; }

        public virtual HashSet<Request> Requests { get; set; }
    }
}
