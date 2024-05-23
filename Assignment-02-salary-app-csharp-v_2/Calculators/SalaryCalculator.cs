public abstract class SalaryCalculator
{
    public abstract double CalculateNetSalary(Employee emp);

    protected double CalculateDeductions(Employee emp)
    {
        return emp.GrossPay * (emp.EmploymentInsurance / 100 + emp.PensionPlan / 100);
    }

    protected double CalculateAdditions(Employee emp)
    {
        return emp.Bonus + emp.Allowance;
    }
}
