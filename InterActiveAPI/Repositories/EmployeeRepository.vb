Imports System.Data.SqlClient

Public Class EmployeeRepository : Implements IEmployeeRepository
    Private connectionString As String
    Public Sub New()
        connectionString = ConfigurationManager.ConnectionStrings("InterActiveDBConnection").ConnectionString
    End Sub

    Public Function GetAllEmployees() As IEnumerable(Of EmployeeView) Implements IEmployeeRepository.GetAllEmployees
        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_GetList_Employee", cn)
        cmd.CommandType = CommandType.StoredProcedure
        Dim dr As SqlDataReader
        Dim emp As EmployeeView
        Dim empList As New List(Of EmployeeView)
        Try
            cn.Open()
            dr = cmd.ExecuteReader()
            While dr.Read()
                emp = New EmployeeView()
                emp.EmployeeId = dr("EmployeeId")
                emp.FirstName = dr("FirstName")
                emp.LastName = dr("LastName")
                emp.Email = dr("Email")
                emp.DepartmentId = dr("DepartmentId")
                emp.DepartmentName = dr("DepartmentName")
                emp.HireDate = dr("HireDate")
                emp.CellPhone = dr("CellPhone")
                emp.Position = dr("Position")
                emp.Salary = dr("Salary")
                emp.Balance = dr("Balance")
                emp.Address = dr("Address")
                emp.Status = dr("Status")
                emp.CreatedBy = dr("CreatedBy")
                emp.CreatedDate = dr("CreatedDate")

                empList.Add(emp)
            End While
            dr.Close()
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return empList

    End Function

    Public Function GetEmployee(id As Integer) As EmployeeView Implements IEmployeeRepository.GetEmployee
        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_Get_Employee", cn)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@EmployeeId", id)
        Dim dr As SqlDataReader
        Dim emp As EmployeeView
        Try
            cn.Open()
            dr = cmd.ExecuteReader()
            While dr.Read()
                emp = New EmployeeView()
                emp.EmployeeId = dr("EmployeeId")
                emp.FirstName = dr("FirstName")
                emp.LastName = dr("LastName")
                emp.Email = dr("Email")
                emp.DepartmentId = dr("DepartmentId")
                emp.DepartmentName = dr("DepartmentName")
                emp.HireDate = dr("HireDate")
                emp.CellPhone = dr("CellPhone")
                emp.Position = dr("Position")
                emp.Salary = dr("Salary")
                emp.Balance = dr("Balance")
                emp.Address = dr("Address")
                emp.Status = dr("Status")
                emp.CreatedBy = dr("CreatedBy")
                emp.CreatedDate = dr("CreatedDate")

            End While

            Return emp
            dr.Close()
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try
    End Function

    Public Function InsertEmployee(employee As Employee) As Employee Implements IEmployeeRepository.InsertEmployee

        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_Insert_Employee", cn)
        cmd.CommandType = CommandType.StoredProcedure

        cmd.Parameters.AddWithValue("@FirstName", employee.FirstName)
        cmd.Parameters.AddWithValue("@LastName", employee.LastName)
        cmd.Parameters.AddWithValue("@Email", employee.Email)
        cmd.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId)
        cmd.Parameters.AddWithValue("@HireDate", employee.HireDate)
        cmd.Parameters.AddWithValue("@CellPhone", employee.CellPhone)
        cmd.Parameters.AddWithValue("@Position", employee.Position)
        cmd.Parameters.AddWithValue("@Salary", employee.Salary)
        cmd.Parameters.AddWithValue("@Address", employee.Address)
        cmd.Parameters.AddWithValue("@Status", employee.Status)
        cmd.Parameters.AddWithValue("@Balance", employee.Balance)
        cmd.Parameters.AddWithValue("@CreatedBy", employee.CreatedBy)
        cmd.Parameters.AddWithValue("EmployeeId", SqlDbType.Int).Direction = ParameterDirection.Output
        Try
            cn.Open()
            cmd.ExecuteNonQuery()
            employee.EmployeeId = cmd.Parameters("EmployeeId").Value
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return employee
    End Function


    Public Function UpdateEmployee(employee As Employee) As Boolean Implements IEmployeeRepository.UpdateEmployee
        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_Update_Employee", cn)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@FirstName", employee.FirstName)
        cmd.Parameters.AddWithValue("@LastName", employee.LastName)
        cmd.Parameters.AddWithValue("@Email", employee.Email)
        cmd.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId)
        cmd.Parameters.AddWithValue("@HireDate", employee.HireDate)
        cmd.Parameters.AddWithValue("@CellPhone", employee.CellPhone)
        cmd.Parameters.AddWithValue("@Position", employee.Position)
        cmd.Parameters.AddWithValue("@Salary", employee.Salary)
        cmd.Parameters.AddWithValue("@Balance", employee.Balance)
        cmd.Parameters.AddWithValue("@Address", employee.Address)
        cmd.Parameters.AddWithValue("@Status", employee.Status)
        cmd.Parameters.AddWithValue("@CreatedBy", employee.CreatedBy)


        cmd.Parameters.AddWithValue("@EmployeeId", employee.EmployeeId)
        Try
            cn.Open()
            cmd.ExecuteNonQuery()
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return True

    End Function

    Public Function DeleteEmployee(id As Integer) As Boolean Implements IEmployeeRepository.DeleteEmployee
        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_Delete_Employee", cn)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@EmployeeId", id)
        Try
            cn.Open()
            cmd.ExecuteNonQuery()
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return True

    End Function

    Public Function CalculateSalary(Employeeid As Integer, month As Integer, year As Integer) As Integer Implements IEmployeeRepository.CalculateSalary

        Dim emp As Employee = GetEmployee(Employeeid)
        Dim salary As Integer = emp.Salary
        Dim BasicSalary = salary

        Dim vacationRepo As New VacationTypeRepository()
        Dim employeeVacations As IEnumerable(Of EmployeeVacation) = vacationRepo.GetEmployeeVacationPerMonth(Employeeid, month, year)

        For Each vacation In employeeVacations

            Dim deductionRatePerDay As Integer = vacationRepo.GetVacationType(vacation.VacationTypeId).DailyDeductionPercentage

            Dim vacationDays As Integer = (vacation.EndDate - vacation.StartDate).Days + 1

            Dim dailySalary As Integer = BasicSalary / DateTime.DaysInMonth(year, month)

            Dim deductionAmountPerDay As Integer = dailySalary * deductionRatePerDay / 100

            Dim totalDeductionAmount As Integer = deductionAmountPerDay * vacationDays

            salary = salary - totalDeductionAmount
        Next
        Return salary
    End Function
End Class





