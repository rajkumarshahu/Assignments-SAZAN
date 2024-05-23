public class Employee
{
    public string Name { get; private set; }
    public double GrossPay { get; set; }
    public double Bonus { get; set; }
    public double Allowance { get; set; }
    public double IncomeTax { get; set; }
    public double EmploymentInsurance { get; set; }
    public double PensionPlan { get; set; }
    public string? Gender { get; set; }
    public int Dependents { get; set; }

    public Employee(string name)
    {
        Name = name;
    }
}
