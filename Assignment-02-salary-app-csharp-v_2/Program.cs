using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Enter employee details:");

        // Read employee name   
        string name = Console.ReadLine() ?? "Unknown Employee";

        // Read employee salary details
        double grossPay = GetDoubleFromConsole("Enter gross pay: ");
        double bonus = GetDoubleFromConsole("Enter bonus: ");
        double allowance = GetDoubleFromConsole("Enter allowance: ");
        double incomeTax = GetDoubleFromConsole("Enter income tax percentage: ");
        double employmentInsurance = GetDoubleFromConsole("Enter employment insurance percentage: ");
        double pensionPlan = GetDoubleFromConsole("Enter pension plan percentage: ");

        // Read employee gender and dependents
        Console.Write("Enter gender (Male/Female): ");
        string gender = Console.ReadLine() ?? "Not Specified";
        int dependents = GetIntFromConsole("Enter number of dependents: ");

        // Create an Employee object with user-provided details
        Employee employee = new Employee(name)
        {
            GrossPay = grossPay,
            Bonus = bonus,
            Allowance = allowance,
            IncomeTax = incomeTax,
            EmploymentInsurance = employmentInsurance,
            PensionPlan = pensionPlan,
            Gender = gender,
            Dependents = dependents
        };

        // Create a SalaryCalculator object and calculate the net salary
        SalaryCalculator calculator = new AdjustedSalaryCalculator();
        double netSalary = calculator.CalculateNetSalary(employee);

        // Display the calculated net salary
        Console.WriteLine($"Net Salary for {employee.Name} is {netSalary:F2}");
    }

    // Method to safely read a double value from console input
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

    // Method to safely read an integer value from console input
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
}
