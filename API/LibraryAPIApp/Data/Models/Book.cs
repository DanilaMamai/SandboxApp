using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace LibraryAPIApp.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        [ForeignKey("Author")]
        public int AuthorId { get; set; }
        public virtual Author Author { get; set; }        
    }
}
