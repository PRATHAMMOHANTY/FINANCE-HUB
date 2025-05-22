using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data;
using dotnetapp.Models;


namespace dotnetapp.Services
{
    public class FeedbackService : IFeedbackService
    {
        public readonly ApplicationDbContext _context;
        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks.Include(f => f.User).ToListAsync();
        }
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _context.Feedbacks.Where(f => f.UserId == userId).Include(f => f.User).ToListAsync();
        }
        public async Task<bool> AddFeedback(Feedback feedback)
        {
             if (feedback == null)
            {
                return false;
            }
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback == null)
            {
                return false;
            }

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}