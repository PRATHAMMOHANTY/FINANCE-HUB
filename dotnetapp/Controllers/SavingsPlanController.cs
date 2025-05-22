using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/savingsplans")]
    public class SavingsPlanController : ControllerBase
    {
        private readonly ISavingsPlanService _savingsPlanService;

        public SavingsPlanController(ISavingsPlanService savingsPlanService)
        {
            _savingsPlanService = savingsPlanService;
        }

        [HttpGet]
        [Authorize(Roles = "RegionalManager, Customer")]
        public async Task<ActionResult<IEnumerable<SavingsPlan>>> GetAllSavingsPlans()
        {
            var savingsPlans = await _savingsPlanService.GetAllSavingsPlans();
            return Ok(savingsPlans);
        }

        [HttpGet("{savingsPlanId}")]
        [Authorize(Roles = "RegionalManager,Customer")]
        public async Task<ActionResult<SavingsPlan>> GetSavingsPlanById(int savingsPlanId)
        {
            var savingsPlan = await _savingsPlanService.GetSavingsPlanById(savingsPlanId);
            if (savingsPlan == null)
            {
                return NotFound(new { Message = "Cannot find any savings plan" });
            }
            return Ok(savingsPlan);
        }

        [HttpPost]
        [Authorize(Roles = "RegionalManager")]
        public async Task<ActionResult> AddSavingsPlan([FromBody] SavingsPlan savingsPlan)
        {
            try
            {
                await _savingsPlanService.AddSavingsPlan(savingsPlan);
                return Ok(new { Message = "Savings plan successfully created" });
            }
            catch (PlanAlreadyExistsException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while adding the savings plan: {ex.Message}" });
            }
        }

        [HttpPut("{savingsPlanId}")]
        [Authorize(Roles = "RegionalManager, Customer")]
        public async Task<ActionResult> UpdateSavingsPlan(int savingsPlanId, [FromBody] SavingsPlan savingsPlan)
        {
            if (savingsPlanId != savingsPlan.SavingsPlanId)
            {
                return BadRequest(new { Message = "SavingsPlanId mismatch" });
            }

            try
            {
                var result = await _savingsPlanService.UpdateSavingsPlan(savingsPlan);
                if (!result)
                {
                    return NotFound(new { Message = "Cannot find any savings plan" });
                }
                return Ok(new { Message = "Savings plan successfully updated" });
            }
            catch (PlanAlreadyExistsException ex)
            {
                return Conflict(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while updating the savings plan: {ex.Message}" });
            }
        }

        [HttpDelete("{savingsPlanId}")]
        [Authorize(Roles = "RegionalManager")]
        public async Task<ActionResult> DeleteSavingsPlan(int savingsPlanId)
        {
            try
            {
                var result = await _savingsPlanService.DeleteSavingsPlan(savingsPlanId);
                if (!result)
                {
                    return NotFound(new { Message = "Cannot find any savings plan" });
                }
                return Ok(new { Message = "Savings plan successfully deleted" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while deleting the savings plan: {ex.Message}" });
            }
        }
    }
}
