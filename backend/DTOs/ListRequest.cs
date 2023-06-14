namespace WebAPI.DTOs
{
    public class ListRequest
    {
        public LoginResponse user { get; set; } = new LoginResponse();
        public GenreResponse subject { get; set; } = new GenreResponse();

    }
}