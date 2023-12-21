﻿using lift_games_database.data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace lift_games_database.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;


        public userController(ApplicationDbContext dbContext)
        {

            _dbContext = dbContext;


        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<user>>> getusers()
        {
            if (_dbContext.User == null)
            {
                return NotFound();
            }
            return await _dbContext.User.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<user>> getuser(int id)
        {
            if (_dbContext.User == null)
            {
                return NotFound();
            }

            var User = await _dbContext.User.FindAsync(id);
            if (User == null)
            {
                return NotFound();
            }

            return User;
        }


        

        [HttpPost]
        public async Task<ActionResult<user>> PostUsernameAndPassword(string username, string password)
        {
            var existingUser = _dbContext.User.Any(u => u.username == username);

            if (existingUser)
            {
                // If the username exists, return a BadRequest with a message
                return BadRequest("Username already in use");
            }
            var User = new user { username = username, password = password };
            _dbContext.User.Add(User);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(getuser), new { id = User }, User);
            return CreatedAtAction(nameof(getuser),new {role = User }, User);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string username)
        {
            var User = _dbContext.User.FirstOrDefault(u => u.username == username);
            if (User == null)
            {
                return NotFound("User not found");
            }

            _dbContext.User.Remove(User);
            await _dbContext.SaveChangesAsync();
            return Ok("User deleted successfully");
        }
    }
}