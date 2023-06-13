using System.ComponentModel.DataAnnotations;

namespace WebAPI.DTOs
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required, DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
