using lift_games_database.data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace lift_games_database.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class gamescontroller : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public gamescontroller(ApplicationDbContext dbContext)
        {

            _dbContext = dbContext;


        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<games>>> getgames()
        {
            if (_dbContext.Games == null)
            {
                return NotFound();
            }
            return await _dbContext.Games.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<games>> getgame(int id)
        {
            if (_dbContext.Games == null)
            {
                return NotFound();
            }

            var Games = await _dbContext.Games.FindAsync(id);
            if(Games == null)
            {
                return NotFound();
            }

            return Games;
        }
      
        [HttpPost]

        public async Task<ActionResult<games>> postgame(games Games)
        {
            _dbContext.Games.Add(Games);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(getgame), new {id=Games.id}, Games);


        }

        [HttpPut]

        public async Task<IActionResult> updategames(int id,games Games)
        {


            if (id != Games.id)
            {

                return BadRequest();
             }    
            _dbContext.Entry(id).State = EntityState.Modified;

           
            try
            {
            await _dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!gamesavailable(id))
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
        private bool gamesavailable(int id)
        {
            return (_dbContext.Games?.Any(x => x.id == id)).GetValueOrDefault();

        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> deletegames(int id)
        {
            if(_dbContext.Games == null)
            {

                return NotFound();

            }
            var Games = await _dbContext.Games.FindAsync(id);
            if (Games == null)
            {

                return NotFound();
            }
            _dbContext.Games.Remove(Games);

            await _dbContext.SaveChangesAsync();
            return Ok();

        }


    }
}
