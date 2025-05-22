using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;
        public FeedbackController(IFeedbackService feedBackService)
        {
            _feedbackService = feedBackService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacks();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });

            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetFeedbacksByUserId(int userId)
        {
            try
            {
                var feedbacks = await _feedbackService.GetFeedbacksByUserId(userId);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                var result = await _feedbackService.AddFeedback(feedback);
                if (result)
                {
                    return Ok(new { Message = "Feedback added successfully." });
                }
                return StatusCode(500, new { Message = "Internal server error." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }
        }
        [HttpDelete("{feedbackId}")]
        public async Task<ActionResult> DeleteFeedback(int feedbackId)
        {
            try
            {
                var result = await _feedbackService.DeleteFeedback(feedbackId);
                if (!result)
                {
                    return NotFound(new { Message = "Cannot find any feedback." });
                }
                return Ok(new { Message = "Feedback deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
            }

        }
    }
}