using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services
{
    public interface ISavingsPlanService
    {
        Task<IEnumerable<SavingsPlan>> GetAllSavingsPlans();
        Task<SavingsPlan> GetSavingsPlanById(int savingsPlanId);
        Task<bool> AddSavingsPlan(SavingsPlan savingsPlan);
        Task<bool> UpdateSavingsPlan(SavingsPlan savingsPlan);
        Task<bool> DeleteSavingsPlan(int savingsPlanId);
    }
}