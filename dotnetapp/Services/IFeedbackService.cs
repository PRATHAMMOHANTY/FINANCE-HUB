using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Services
{

    public interface IFeedbackService

    {
        Task<IEnumerable<Feedback>> GetAllFeedbacks();
        Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId);
        Task<bool> AddFeedback(Feedback feedback);
        Task<bool> DeleteFeedback(int feedbackId);
    }
}