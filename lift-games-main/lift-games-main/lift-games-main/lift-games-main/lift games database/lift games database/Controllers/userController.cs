
using lift_games_database.data;
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
        public async Task<ActionResult<user>> PostUser(user user)
        {
            if (_dbContext.User.Any(u => u.username == user.username))
            {
            
                return BadRequest("Username already in use");
            }
            _dbContext.User.Add(user);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(getuser), new { id = user.id }, user);
        }
        [HttpPut]

        public async Task<IActionResult> updateuse(int id, user User)
        {


            if (id != User.id)
            {

                return BadRequest();
            }
            _dbContext.Entry(id).State = EntityState.Modified;


            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!useravailable(id))
                {

                    return NotFound();
                }
                else
                {
                    throw;
                }

            }
            return Ok();

        }
        private bool useravailable(int id)
        {
            return (_dbContext.User?.Any(x => x.id == id)).GetValueOrDefault();

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

        //[HttpDelete("deleteAll")]
        //public async Task<IActionResult> DeleteAllusers()
        //{
        //    _dbContext.User.RemoveRange(_dbContext.User);
        //    await _dbContext.SaveChangesAsync();
        //    return Ok("All users deleted successfully.");
        //}


    }
}