using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Exceptions;
using dotnetapp.Models;
using dotnetapp.Data;
namespace dotnetapp.Services
{
    public class SavingsPlanService : ISavingsPlanService
    {
        private readonly ApplicationDbContext _context;

        public SavingsPlanService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SavingsPlan>> GetAllSavingsPlans()
        {
            return await _context.SavingsPlans.ToListAsync();
        }

        public async Task<SavingsPlan> GetSavingsPlanById(int savingsPlanId)
        {
            return await _context.SavingsPlans.FindAsync(savingsPlanId);
        }

        public async Task<bool> AddSavingsPlan(SavingsPlan savingsPlan)
        {
            if (_context.SavingsPlans.Any(s => s.Name == savingsPlan.Name))
            {
                throw new PlanAlreadyExistsException("Plan with the same name already exists");
            }

            _context.SavingsPlans.Add(savingsPlan);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateSavingsPlan(SavingsPlan savingsPlan)
        {
            var existingPlan = await _context.SavingsPlans.FindAsync(savingsPlan.SavingsPlanId);
            if (existingPlan == null)
            {
                return false;
            }

            if (existingPlan.Name != savingsPlan.Name && _context.SavingsPlans.Any(sp => sp.Name == savingsPlan.Name))
            {
                throw new PlanAlreadyExistsException("Plan with the same name already exists");
            }

            existingPlan.Name = savingsPlan.Name;
            existingPlan.GoalAmount = savingsPlan.GoalAmount;
            existingPlan.TimeFrame = savingsPlan.TimeFrame;
            existingPlan.RiskLevel = savingsPlan.RiskLevel;
            existingPlan.Description = savingsPlan.Description;
            existingPlan.Status = savingsPlan.Status;


            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteSavingsPlan(int savingsPlanId)
        {
            var savingsPlan = await _context.SavingsPlans.FindAsync(savingsPlanId);
            if (savingsPlan == null)
            {
                return false;
            }

            _context.SavingsPlans.Remove(savingsPlan);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
