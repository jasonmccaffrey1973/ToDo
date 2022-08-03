using System.ComponentModel.DataAnnotations;

namespace ToDoApi.Models
{
    public class AddItemRequest
    {
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }

        public statuses Status { get; set; }
    }

}
