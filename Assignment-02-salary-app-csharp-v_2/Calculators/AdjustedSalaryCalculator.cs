public class AdjustedSalaryCalculator : SalaryCalculator
{
    public override double CalculateNetSalary(Employee emp)
    {
        // Calculate additions and deductions
        double additions = CalculateAdditions(emp);
        double deductions = CalculateDeductions(emp);
        double incomeTaxRate = emp.IncomeTax;

        
        // Apply gender-based adjustment
        if (emp.Gender!.ToLower() == "female")
        {
            incomeTaxRate = Math.Max(0, incomeTaxRate - 1);  // reduce tax by 1 percent if female
        }

        // Apply dependent-based adjustment
        if (emp.Dependents >= 3)
        {
            incomeTaxRate -= 2 * emp.Dependents;  // reduce tax by 2 percent per dependent if 3 or more dependents
        }

        // Apply the income tax after adjustments
        double incomeTaxDeduction = (emp.GrossPay + additions - deductions) * (incomeTaxRate / 100);

        // Calculate net salary
        return emp.GrossPay + additions - deductions - incomeTaxDeduction;
    }
}
