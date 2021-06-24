using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;

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
        public int UserID { get; set; }
        [Required]
        [MaxLength(50)]
        public string Email { get; set; }
        [Required]
        [MaxLength(14)]
        public string PhoneNum { get; set; }
        [Required]
        [MaxLength(25)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(25)]
        public string LastName { get; set; }
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";
        [Newtonsoft.Json.JsonIgnore]
        public string Password { get; set; }
        public int UserTypeID { get; set; }
        public int MarkCount { get; set; }
        public double Rating { get; set; }
        public virtual ICollection<Advertisement> Advertisements { get; set; }
        public virtual ICollection<Request> Requests { get; set; }
        public virtual UserType UserType { get; set; }

    }
}
