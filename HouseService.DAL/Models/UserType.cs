using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Models
{
    public class UserType
    {

        public UserType()
        {
            Users = new HashSet<User>();
        }

        [Key]
        public int UserTypeID { get; set; }
        [Required]
        public string UserTypeName { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
