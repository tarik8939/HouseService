using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Models
{
    public class Request
    {
        [Key]
        public int RequestID { get; set; }

        public string UserID { get; set; }
        public int AdvertisementID { get; set; }
        public int StateID { get; set; }


        public virtual User User { get; set; }
        public virtual Advertisement Advertisement { get; set; }
        public virtual State State { get; set; }
    }
}
