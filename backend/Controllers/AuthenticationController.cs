using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/authenticate")]
    public class AuthenticationController: ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AuthenticationController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost("roles/add")]
        public async Task<IActionResult> AddRole([FromBody] CreateRoleRequest request)
        {
            var appRole = new ApplicationRole { Name = request.Role };
            var result = await _roleManager.CreateAsync(appRole);

            return Ok(new { Message = "Role created successfully" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await RegisterAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<RegisterResponse> RegisterAsync(RegisterRequest request)
        {
            try
            {
                var userExists = await _userManager.FindByEmailAsync(request.Email);
                if(userExists != null)
                    return new RegisterResponse { Message = "User already exists", Success = false };

                userExists = new ApplicationUser
                {
                    Email = request.Email,
                    UserName = request.Username,
                    FullName = request.FullName,
                    ConcurrencyStamp = Guid.NewGuid().ToString()
                };

                var createUserResult = await _userManager.CreateAsync(userExists, request.Password);
                if (!createUserResult.Succeeded)
                    return new RegisterResponse { Message = $"User creation failed " +
                        $"{createUserResult.Errors.First().Description}", Success = false };

                var addUserToRoleResult = await _userManager.AddToRoleAsync(userExists, "User");
                if (!addUserToRoleResult.Succeeded)
                    return new RegisterResponse { Message = $"Create user succede, could not add a role" +
                                               $"{addUserToRoleResult.Errors.First().Description}", Success = false };

                return new RegisterResponse { Message = "User created successfully", Success = true };
            }
            catch (Exception ex)
            {
                return new RegisterResponse { Message = ex.Message, Success = false };
            }
        }

        [HttpPost("login")]
        [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(LoginResponse))]
        public async  Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await LoginAsync(request);

            return result.Success ? Ok(result) : BadRequest(result.Message);
        }

        private async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    return new LoginResponse { Success = false, Message = "Invalid credentials" };

                var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
                var roles = await _userManager.GetRolesAsync(user);
                var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role));
                claims.AddRange(roleClaims);

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("superSecretKey1234"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var expires = DateTime.Now.AddMinutes(30);

                var token = new JwtSecurityToken(
                    issuer: "http://localhost:3000",
                    audience: "http://localhost:3000",
                    claims: claims,
                    expires: expires,
                    signingCredentials: creds
                );

                return new LoginResponse
                {
                    AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                    Message = "Login successful",
                    Email = user?.Email,
                    Success = true,
                    UserId = user?.Id.ToString()
                };
            }
            catch (Exception ex)
            {
                return new LoginResponse { Success = false, Message = ex.Message };
            }
            
        }

        [HttpGet]
        [Route("user")]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            var roles = new List<string>();

            foreach (var role in userRoles)
            {
                roles.Add(role);
            }

            return Ok(new { user.Id, user.FullName, user.Email, roles });
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "success" });
        }


    }
}
