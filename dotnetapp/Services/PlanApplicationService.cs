using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
 
namespace dotnetapp.Services
{
    public class PlanApplicationService : IPlanApplicationService
    {
        private readonly ApplicationDbContext _context;
 
        public PlanApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        public async Task<IEnumerable<PlanApplication>> GetAllPlanApplications()
        {
            return await _context.PlanApplications
                .Include(pa => pa.SavingsPlan)
                .Include(pb => pb.User)
                .ToListAsync();
        }
 
        public async Task<PlanApplication> GetPlanApplicationById(int planApplicationId)
        {
            return await _context.PlanApplications
                .Include(pa => pa.SavingsPlan)
                .Include(pa => pa.User)
                .FirstOrDefaultAsync(pa => pa.PlanApplicationId == planApplicationId);
        }
 
        public async Task<bool> AddPlanApplication(PlanApplication planApplication)
        {
            var user = await _context.Users.FindAsync(planApplication.UserId);
            var savingsPlan = await _context.SavingsPlans.FindAsync(planApplication.SavingsPlanId);
 
            if (user == null || savingsPlan == null)
            {
                return false; 
            }
 
            planApplication.User = user;
            planApplication.SavingsPlan = savingsPlan;
 
            planApplication.Status = "Pending";
            planApplication.ApplicationDate = DateTime.Now.Date;
 
            await _context.PlanApplications.AddAsync(planApplication);
            await _context.SaveChangesAsync();
 
            return true;
        }
 
        public async Task<IEnumerable<PlanApplication>> GetPlanApplicationsByUserId(int userId)
        {
            return await _context.PlanApplications
                .Include(pa => pa.SavingsPlan)
                .Include(pa => pa.User)
                .Where(pa => pa.UserId == userId)
                .ToListAsync();
        }
 
        public async Task<IEnumerable<PlanApplication>> GetPlanApplicationsBySavingsPlanIdAndUserIdAsync(int savingsPlanId, int userId)
        {
            return await _context.PlanApplications
                .Include(pa => pa.SavingsPlan)
                .Include(pa => pa.User)
                .Where(pa => pa.SavingsPlanId == savingsPlanId && pa.UserId == userId)
                .ToListAsync();
        }
 
 
        public async Task<bool> UpdatePlanApplication(int planApplicationId, PlanApplication planApplication)
        {
            var existingApplication = await _context.PlanApplications.FindAsync(planApplicationId);
            if (existingApplication == null)
            {
                return false;
            }

            // Updates the actual property values
            _context.Entry(existingApplication).CurrentValues.SetValues(planApplication);
            //Tells EF Core this entity needs to be saved //Mark for update
            _context.Entry(existingApplication).State = EntityState.Modified;
            //Save to database
            await _context.SaveChangesAsync();
            return true;
        }
 
        public async Task<bool> DeletePlanApplication(int planApplicationId)
        {
            var planApplication = await _context.PlanApplications.FindAsync(planApplicationId);
            if (planApplication == null)
            {
                return false;
            }
 
            _context.PlanApplications.Remove(planApplication);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}