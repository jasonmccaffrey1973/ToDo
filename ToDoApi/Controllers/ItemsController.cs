using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApi.Data;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemDbContext _context;
        public ItemController(ItemDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Item>> Get() => await _context.Items.ToListAsync();


        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Item), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _context.Items.FindAsync(id);
            return item != null ? Ok(item) : NotFound();
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> NewItem(AddItemRequest addItemRequest)
        {
            var item = new Item()
            {
                Title = addItemRequest.Title,
                Description = addItemRequest.Description,
                Status = statuses.Created
            };
            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateItem(int id, Item item)
        {
            if (id != item.Id) return BadRequest();
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var itemToDelete = await _context.Items.FindAsync(id);
            if (itemToDelete == null) return NotFound();

            _context.Items.Remove(itemToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
   
    }
}
