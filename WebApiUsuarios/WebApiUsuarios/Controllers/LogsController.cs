using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiUsuarios.Models;

namespace WebApiUsuarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
        private readonly LogsContext _context;
        public LogsController(LogsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Logs>> Get()
        {
            return _context.Logs.ToList();
        }

        [Authorize("Bearer")]
        [HttpGet("{email}")]
        public async Task<IActionResult> Get([FromRoute] string email)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var value = _context.Logs.Where(l => l.Email == email);
            if (value == null)
            {
                return NotFound();
            }
            return Ok(value);
        }

        // POST api/values
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Logs value)
        {
            value.DataHora = DateTime.Now;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.Logs.Add(value);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = value.Id }, value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Logs value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != value.Id)
            {
                return BadRequest();
            }
            _context.Entry(value).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ValueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var value = await _context.Logs.FindAsync(id);
            if (value == null)
            {
                return NotFound();
            }
            _context.Logs.Remove(value);
            await _context.SaveChangesAsync();
            return Ok(value);
        }

        private bool ValueExists(int id)
        {
            return _context.Logs.Any(e => e.Id == id);
        }
    }
}