using Microsoft.EntityFrameworkCore;

namespace WebApiUsuarios.Models
{
    public class LogsContext : DbContext
    {
        public LogsContext(DbContextOptions<LogsContext> options) : base(options)
        {
        }

        public DbSet<Logs> Logs { get; set; }
    }
}