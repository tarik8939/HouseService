using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HouseService.DAL.Models
{
    public class User
    {
        public User()
        {
            Advertisements = new HashSet<Advertisement>();
            Requests = new HashSet<Request>();
        }
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
        public int UserTypeID { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public virtual ICollection<Advertisement> Advertisements { get; set; }
        public virtual ICollection<Request> Requests { get; set; }
        public virtual UserType UserType { get; set; }

    }
}
