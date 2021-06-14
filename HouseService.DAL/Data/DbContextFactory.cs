using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HouseService.DAL.Data
{
    public class DatabaseContextFactory : IDesignTimeDbContextFactory<HouseDbContext>
    {
        public HouseDbContext CreateDbContext(string[] args)
        {
            AppConfiguration appConfig = new AppConfiguration();
            var opsBuilder = new DbContextOptionsBuilder<HouseDbContext>();
            opsBuilder.UseSqlServer(appConfig.SqlConnectionString);
            return new HouseDbContext(opsBuilder.Options);
        }
    }
}
