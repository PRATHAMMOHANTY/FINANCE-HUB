using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Data;
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlanApplicationController : ControllerBase
    {
        private readonly IPlanApplicationService _planApplicationService;
        private readonly ApplicationDbContext _context;
        public PlanApplicationController(IPlanApplicationService planApplicationService, ApplicationDbContext context)
        {
            _planApplicationService = planApplicationService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanApplication>>> GetAllPlanApplications()
        {
            try
            {
                IEnumerable<PlanApplication> applications = await _planApplicationService.GetAllPlanApplications();
                return Ok(applications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("{applicationId}")]
        public async Task<ActionResult<PlanApplication>> GetPlanApplicationById(int applicationId)
        {
            try
            {
                PlanApplication application = await _planApplicationService.GetPlanApplicationById(applicationId);
                if (application == null)
                {
                    return NotFound(new { Message = "Plan application not found." });
                }
                return Ok(application);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddPlanApplication([FromBody] PlanApplication planApplication)
        {
            try
            {
                var savingsPlan = await _context.SavingsPlans.FindAsync(planApplication.SavingsPlanId);
                if (savingsPlan == null)
                {
                    return BadRequest(new { Message = "Associated savings plan does not exist." });
                }
                if (planApplication.AppliedAmount > savingsPlan.GoalAmount)
                {
                    return BadRequest(new { Message = "Applied amount exceeds the goal amount of the savings plan." });
                }
                var result = await _planApplicationService.AddPlanApplication(planApplication);
                if (result)
                {
                    return Ok(new { Message = "Plan application added successfully." });
                }
                return StatusCode(500, new { Message = "An error occurred while adding the plan application." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PlanApplication>>> GetPlanApplicationsByUserId(int userId)
        {
            try
            {
                IEnumerable<PlanApplication> applications = await _planApplicationService.GetPlanApplicationsByUserId(userId);
                return Ok(applications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("savingsPlan/{savingsPlanId}/user/{userId}")]
        public async Task<ActionResult<IEnumerable<PlanApplication>>> GetPlanApplicationsBySavingsPlanIdAndUserId(int savingsPlanId, int userId)
        {
            try
            {
                IEnumerable<PlanApplication> applications = await _planApplicationService.GetPlanApplicationsBySavingsPlanIdAndUserIdAsync(savingsPlanId, userId);
                return Ok(applications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }


        [HttpPut("{applicationId}")]
        public async Task<ActionResult> UpdatePlanApplication(int applicationId, [FromBody] PlanApplication planApplication)
        {
            try
            {
                var result = await _planApplicationService.UpdatePlanApplication(applicationId, planApplication);
                if (result)
                {
                    return Ok(new { Message = "Plan application updated successfully." });
                }
                return NotFound(new { Message = "Plan application not found." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpDelete("{applicationId}")]
        public async Task<ActionResult> DeletePlanApplication(int applicationId)
        {
            try
            {
                var result = await _planApplicationService.DeletePlanApplication(applicationId);
                if (result)
                {
                    return Ok(new { Message = "Plan application deleted successfully." });
                }
                return NotFound(new { Message = "Plan application not found." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost("application/upload")]
        public async Task<ActionResult> UploadImage([FromForm] IFormFile file)
        {
            Console.WriteLine("Inside UploadImage");
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadsDirectory = Path.Combine("/home/coder/project/workspace/angularapp/src/assets/uploads");
            if (!Directory.Exists(uploadsDirectory))
            {
                Directory.CreateDirectory(uploadsDirectory);
            }

            // Ensure the file name is sanitized to avoid path traversal issues
            var fileName = Path.GetFileName(file.FileName);
            var filePath = Path.Combine(uploadsDirectory, fileName);

            // Use 'using' statement to ensure proper disposal of FileStream
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl = $"/assets/uploads/{fileName}";
            return Ok(new { ImageUrl = imageUrl });
        }

    }
}