using System;

namespace WebApiUsuarios.Models
{
    public class Logs
    {
        public int Id { get; set; }
        public DateTime DataHora { get; set; }
        public string Email { get; set; }
        public string Resultado { get; set; }
    }
}