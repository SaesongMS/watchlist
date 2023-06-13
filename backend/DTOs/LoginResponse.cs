namespace WebAPI.DTOs
{
    public class LoginResponse
    {
        public bool Success { get; set; } = false;
        public string AccessToken { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;

    }
}
