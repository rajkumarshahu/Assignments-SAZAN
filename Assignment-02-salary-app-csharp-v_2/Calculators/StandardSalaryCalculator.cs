public class StandardSalaryCalculator : SalaryCalculator
{
    public override double CalculateNetSalary(Employee emp)
    {
        double additions = CalculateAdditions(emp);
        double deductions = CalculateDeductions(emp);
        double incomeTaxDeduction = emp.GrossPay * (emp.IncomeTax / 100);
        return emp.GrossPay + additions - deductions - incomeTaxDeduction;
    }
}
