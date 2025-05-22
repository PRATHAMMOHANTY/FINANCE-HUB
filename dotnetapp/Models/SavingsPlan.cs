using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Threading.Tasks;

using System.Text.Json.Serialization;

using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class SavingsPlan
    {
        [Key]
        public int SavingsPlanId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        [Required]
        [Range(1000, 10000000)]
        public decimal GoalAmount { get; set; }
        [Required]
        [Range(1, 50)]
        public int TimeFrame { get; set; }
        [Required]
        public string RiskLevel { get; set; }
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        [Required]
        public string Status { get; set; }
    }

}

