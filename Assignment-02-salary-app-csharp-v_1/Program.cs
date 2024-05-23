using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Employee Salary Calculation");

        // Get employee details
        Console.Write("Enter employee name: ");
        string employeeName = Console.ReadLine() ?? "";

        double grossPay = GetDoubleFromConsole("Enter gross pay: ");
        double bonus = GetDoubleFromConsole("Enter bonus: ");
        double allowance = GetDoubleFromConsole("Enter allowance: ");
        double incomeTax = GetDoubleFromConsole("Enter income tax percentage: ");
        double employmentInsurance = GetDoubleFromConsole("Enter employment insurance percentage: ");
        double pensionPlan = GetDoubleFromConsole("Enter pension plan percentage: ");

        Console.Write("Enter gender (male/female): ");
        string gender = Console.ReadLine() ?? "";

        int dependents = GetIntFromConsole("Enter number of dependents: ");

        // Calculate deductions and net salary
        double deductions = CalculateDeductions(grossPay, employmentInsurance, pensionPlan);
        double additions = bonus + allowance;
        grossPay += additions;

        // Adjustments for specific conditions
        if (gender.ToLower() == "female")
        {
            incomeTax = Math.Max(0, incomeTax - 1);
        }
        if (dependents == 3 || dependents == 4)
        {
            incomeTax -= 2 * dependents;
        }

        double incomeTaxDeduction = grossPay * (incomeTax / 100);
        double netSalary = grossPay - (deductions + incomeTaxDeduction);

        // Display results
        Console.WriteLine("\nCalculation Results:");
        Console.WriteLine($"Employee Name: {employeeName}");
        Console.WriteLine($"Gross Salary: {grossPay:F2}");
        Console.WriteLine($"Additions: {additions:F2}");
        Console.WriteLine($"Deductions: {deductions:F2}");
        Console.WriteLine($"Net Salary: {netSalary:F2}");
    }

    private static double GetDoubleFromConsole(string prompt)
    {
        double value;
        Console.Write(prompt);
        while (!double.TryParse(Console.ReadLine(), out value))
        {
            Console.Write("Invalid input. Please enter a valid number: ");
        }
        return value;
    }

    private static int GetIntFromConsole(string prompt)
    {
        int value;
        Console.Write(prompt);
        while (!int.TryParse(Console.ReadLine(), out value))
        {
            Console.Write("Invalid input. Please enter a valid integer: ");
        }
        return value;
    }

    private static double CalculateDeductions(double grossPay, double employmentInsurance, double pensionPlan)
    {
        return grossPay * (employmentInsurance / 100 + pensionPlan / 100);
    }
}
