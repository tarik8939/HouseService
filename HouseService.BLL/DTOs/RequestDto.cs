﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.BLL.DTOs
{
    public class RequestDto
    {
        public int UserID { get; set; }
        public int AdvertisementID { get; set; }
        public string Comment { get; set; }
        public int StateID { get; set; }
    }
}
