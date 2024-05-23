-- Drop the stored procedure if it exists
IF OBJECT_ID('dbo.sp_TotalSalaries', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE dbo.sp_TotalSalaries;
END
GO

-- Create the stored procedure
CREATE PROCEDURE [dbo].[sp_TotalSalaries]
AS
BEGIN
    -- Variable Declarations
    DECLARE @CurrentEmpId INT,
            @CurrentFinalSalary MONEY,
            @CurrentEmpName VARCHAR(100),
            @CurrentAdditions MONEY,
            @CurrentDependents INT,
            @CurrentDeductions MONEY,
            @CurrentGender VARCHAR(50),
            @CurrentGrossSalary MONEY,
            @TotalEmployees INT,
            @Counter INT = 1,
            @CurrentFinalDeductions MONEY;

    -- Get the total number of employees
    SELECT @TotalEmployees = MAX(emp_id) FROM tblEmployee;

    -- Declare table variable to store final data
    DECLARE @FinalData TABLE (
        EmpId INT,
        EmpName VARCHAR(100),
        TotalDeductions MONEY,
        TotalAdditions MONEY,
        FinalSalary MONEY
    );

    -- Loop through each employee
    WHILE @Counter <= @TotalEmployees
    BEGIN
        -- Select employee details
        SELECT @CurrentEmpId = emp_id,
               @CurrentEmpName = emp_name,
               @CurrentDependents = noOfDependants,
               @CurrentGrossSalary = FinalSalary,
               @CurrentGender = emp_gender,
               @CurrentAdditions = Additions,
               @CurrentDeductions = (itex + ei + cpp)
        FROM tblEmployee
        WHERE emp_id = @Counter;

        -- Calculate salary adjustments based on gender and dependents
        IF @CurrentGender = 'Female'
        BEGIN
            IF @CurrentDependents = 2
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * (@CurrentDeductions - 0.02);
            END
            ELSE IF @CurrentDependents = 3
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * (@CurrentDeductions - 0.03);
            END
            ELSE IF @CurrentDependents = 4
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * (@CurrentDeductions - 0.04);
            END
            ELSE
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * @CurrentDeductions;
            END
            SET @CurrentFinalSalary = @CurrentGrossSalary - @CurrentFinalDeductions + @CurrentAdditions;
        END
        ELSE IF @CurrentGender = 'Male'
        BEGIN
            IF @CurrentDependents = 2
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * @CurrentDeductions;
            END
            ELSE IF @CurrentDependents = 3
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * (@CurrentDeductions - 0.01);
            END
            ELSE IF @CurrentDependents = 4
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * (@CurrentDeductions - 0.02);
            END
            ELSE
            BEGIN
                SET @CurrentFinalDeductions = @CurrentGrossSalary * @CurrentDeductions;
            END
            SET @CurrentFinalSalary = @CurrentGrossSalary - @CurrentFinalDeductions + @CurrentAdditions;
        END

        -- Insert calculated data into table variable
        INSERT INTO @FinalData (EmpId, EmpName, FinalSalary, TotalDeductions, TotalAdditions)
        VALUES (@CurrentEmpId, @CurrentEmpName, @CurrentFinalSalary, @CurrentFinalDeductions, @CurrentAdditions);

        -- Increment the counter
        SET @Counter = @Counter + 1;
    END

    -- Remove any null values from the result set
    DELETE FROM @FinalData WHERE EmpId IS NULL;

    -- Select the final data
    SELECT DISTINCT EmpId, EmpName, FinalSalary, TotalDeductions, TotalAdditions FROM @FinalData;
END
GO


EXEC dbo.sp_TotalSalaries;

