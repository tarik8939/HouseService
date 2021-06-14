using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Models
{
    public class State
    {

        public State()
        {
            Requests = new HashSet<Request>();
        }

        [Key]
        public int StateID { get; set; }
        public string StatusName { get; set; }

        public virtual ICollection<Request> Requests { get; set; }
    }
}
