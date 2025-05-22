export interface SavingsPlan{
    SavingsPlanId? : number;
    Name : string;
    GoalAmount : number;
    TimeFrame : number;
    RiskLevel : 'Low' | 'Medium' | 'High';
    Description : string;
    Status : string;
}