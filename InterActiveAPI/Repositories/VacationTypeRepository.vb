Imports System.Data.SqlClient

Public Class VacationTypeRepository : Implements IVacationRepository

    Private connectionString As String
    Public Sub New()
        connectionString = ConfigurationManager.ConnectionStrings("InterActiveDBConnection").ConnectionString
    End Sub


    Public Sub DeleteEmployeeVacation(id As Integer) Implements IVacationRepository.DeleteEmployeeVacation
        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_Delete_EmployeeVacation", cn)
        cmd.CommandType = CommandType.StoredProcedure

        cmd.Parameters.AddWithValue("@EmployeeVacationId", id)
        Try
            cn.Open()
            cmd.ExecuteNonQuery()
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try
    End Sub

    Public Function GetAllEmployeeVacations(ByVal id As Integer) As IEnumerable(Of EmployeeVacationView) Implements IVacationRepository.GetAllEmployeeVacations
        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_GetList_EmployeeVacations", cn)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@EmployeeId", id)

        Dim employeeVacations As New List(Of EmployeeVacationView)
        Try
            cn.Open()
            Dim reader As SqlDataReader = cmd.ExecuteReader()
            While reader.Read()
                Dim employeeVacation As New EmployeeVacationView
                employeeVacation.EmployeeVacationId = reader("EmployeeVacationId")
                employeeVacation.EmployeeId = reader("EmployeeId")
                employeeVacation.VacationTypeId = reader("VacationTypeId")
                employeeVacation.StartDate = reader("StartDate")
                employeeVacation.EndDate = reader("EndDate")
                employeeVacation.ApprovedBy = reader("ApprovedBy")
                employeeVacation.ApprovedDate = reader("ApprovedDate")
                employeeVacation.CreatedBy = reader("CreatedBy")
                employeeVacation.CreatedDate = reader("CreatedDate")
                employeeVacation.VacationType = reader("VacationType")
                Dim diff As String = (employeeVacation.EndDate - employeeVacation.StartDate).TotalDays + 1.ToString()
                employeeVacation.VacationDays = diff

                employeeVacations.Add(employeeVacation)
            End While
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try
        Return employeeVacations
    End Function

    Public Function GetEmployeeVacationPerMonth(id As Integer, month As Integer, year As Integer) As IEnumerable(Of EmployeeVacation) Implements IVacationRepository.GetEmployeeVacationPerMonth

        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_GetList_EmployeeVacationPerMonth", cn)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@EmployeeId", id)
        cmd.Parameters.AddWithValue("@Month", month)
        cmd.Parameters.AddWithValue("@Year", year)
        Dim employeeVacationsPerMonth As New List(Of EmployeeVacation)
        Try
            cn.Open()
            Dim reader As SqlDataReader = cmd.ExecuteReader()
            While reader.Read()
                Dim employeeVacation As New EmployeeVacation
                employeeVacation.EmployeeVacationId = reader("EmployeeVacationId")
                employeeVacation.EmployeeId = reader("EmployeeId")
                employeeVacation.VacationTypeId = reader("VacationTypeId")
                employeeVacation.StartDate = reader("StartDate")
                employeeVacation.EndDate = reader("EndDate")
                employeeVacation.ApprovedBy = reader("ApprovedBy")
                employeeVacation.ApprovedDate = reader("ApprovedDate")
                employeeVacation.CreatedBy = reader("CreatedBy")
                employeeVacation.CreatedDate = reader("CreatedDate")

                employeeVacationsPerMonth.Add(employeeVacation)
            End While
            Return employeeVacationsPerMonth
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try



    End Function

    Public Function InsertEmployeeVacation(employeeVacation As EmployeeVacation) As EmployeeVacation Implements IVacationRepository.InsertEmployeeVacation

        Dim employeeRepository As New EmployeeRepository
        Dim employee As Employee = employeeRepository.GetEmployee(employeeVacation.EmployeeId)
        Dim vacationBalance As Integer = employee.Balance


        If vacationBalance < 0 Then
            Throw New Exception("The employee dont have the right balance")
        End If

        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_Insert_EmployeeVacation", cn)
        cmd.CommandType = CommandType.StoredProcedure

        cmd.Parameters.AddWithValue("@EmployeeId", employeeVacation.EmployeeId)
        cmd.Parameters.AddWithValue("@VacationTypeId", employeeVacation.VacationTypeId)
        cmd.Parameters.AddWithValue("@StartDate", employeeVacation.StartDate)
        cmd.Parameters.AddWithValue("@EndDate", employeeVacation.EndDate)
        cmd.Parameters.AddWithValue("@CreatedBy", employeeVacation.CreatedBy)
        cmd.Parameters.AddWithValue("@ApprovedBy", employeeVacation.ApprovedBy)
        cmd.Parameters.AddWithValue("@ApprovedDate", employeeVacation.ApprovedDate)
        cmd.Parameters.AddWithValue("EmployeeVacationId", SqlDbType.Int).Direction = ParameterDirection.Output


        Dim vacationDays As Integer = (employeeVacation.EndDate - employeeVacation.StartDate).Days + 1
        Dim newBalance As Integer = vacationBalance - vacationDays

        Dim cmd2 As New SqlCommand("sp_Update_Employee", cn)
        cmd2.CommandType = CommandType.StoredProcedure

        cmd2.Parameters.AddWithValue("@EmployeeId", employeeVacation.EmployeeId)
        cmd2.Parameters.AddWithValue("@FirstName", employee.FirstName)
        cmd2.Parameters.AddWithValue("@LastName", employee.LastName)
        cmd2.Parameters.AddWithValue("@Email", employee.Email)
        cmd2.Parameters.AddWithValue("@DepartmentId", employee.DepartmentId)
        cmd2.Parameters.AddWithValue("@HireDate", employee.HireDate)
        cmd2.Parameters.AddWithValue("@CellPhone", employee.CellPhone)
        cmd2.Parameters.AddWithValue("@Position", employee.Position)
        cmd2.Parameters.AddWithValue("@Salary", employee.Salary)
        cmd2.Parameters.AddWithValue("@Balance", newBalance)
        cmd2.Parameters.AddWithValue("@Address", employee.Address)
        cmd2.Parameters.AddWithValue("@Status", employee.Status)
        cmd2.Parameters.AddWithValue("@CreatedBy", employee.CreatedBy)

        Try
            cn.Open()
            cmd.ExecuteNonQuery()
            cmd2.ExecuteNonQuery()
            employeeVacation.EmployeeVacationId = cmd.Parameters("EmployeeVacationId").Value
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return employeeVacation
    End Function

    Public Function UpdateEmployeeVacation(employeeVacation As EmployeeVacation) As Boolean Implements IVacationRepository.UpdateEmployeeVacation

        Dim employeeRepository As New EmployeeRepository
        Dim employee As Employee = employeeRepository.GetEmployee(employeeVacation.EmployeeId)

        Dim vacationBalance As Integer = employee.Balance
        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_Update_EmployeeVacation", cn)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@EmployeeVacationId", employeeVacation.EmployeeVacationId)
        cmd.Parameters.AddWithValue("@EmployeeId", employeeVacation.EmployeeId)
        cmd.Parameters.AddWithValue("@VacationTypeId", employeeVacation.VacationTypeId)
        cmd.Parameters.AddWithValue("@StartDate", employeeVacation.StartDate)
        cmd.Parameters.AddWithValue("@EndDate", employeeVacation.EndDate)
        cmd.Parameters.AddWithValue("@CreatedBy", employeeVacation.CreatedBy)
        cmd.Parameters.AddWithValue("@ApprovedBy", employeeVacation.ApprovedBy)
        cmd.Parameters.AddWithValue("@ApprovedDate", employeeVacation.ApprovedDate)

        Dim vacationDays As Integer = (employeeVacation.EndDate - employeeVacation.StartDate).Days
        Dim newBalance As Integer = vacationBalance - vacationDays

        Dim cmd2 As New SqlCommand("sp_Update_EmployeeBalance", cn)
        cmd2.CommandType = CommandType.StoredProcedure
        cmd2.Parameters.AddWithValue("@EmployeeId", employeeVacation.EmployeeId)
        cmd2.Parameters.AddWithValue("@Balance", newBalance)
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

    Public Function GetVacationType(id As Integer) As VacationType Implements IVacationRepository.GetVacationType
        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_Get_VacationType", cn)
        cmd.CommandType = CommandType.StoredProcedure
        cmd.Parameters.AddWithValue("@VacationTypeId", id)

        Dim vacationType As New VacationType
        Try
            cn.Open()
            Dim reader As SqlDataReader = cmd.ExecuteReader()
            While reader.Read()
                vacationType.VacationTypeId = reader("VacationTypeId")
                vacationType.VacationType = reader("VacationType")
                vacationType.[Status] = reader("Status")
                vacationType.DailyDeductionPercentage = reader("DailyDeductionPercentage")
                vacationType.CreatedBy = reader("CreatedBy")
                vacationType.CreatedDate = reader("CreatedDate")

            End While
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try
        Return vacationType
    End Function

    Public Function GetAllVacationTypes() As IEnumerable(Of VacationType) Implements IVacationRepository.GetAllVacationTypes

        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_GetList_VacationType", cn)
        cmd.CommandType = CommandType.StoredProcedure

        Dim vacationTypes As New List(Of VacationType)
        Try
            cn.Open()
            Dim reader As SqlDataReader = cmd.ExecuteReader()
            While reader.Read()
                Dim vacationType As New VacationType
                vacationType.VacationTypeId = reader("VacationTypeId")
                vacationType.VacationType = reader("VacationType")
                vacationType.[Status] = reader("Status")
                vacationType.DailyDeductionPercentage = reader("DailyDeductionPercentage")
                vacationType.CreatedBy = reader("CreatedBy")
                vacationType.CreatedDate = reader("CreatedDate")
                vacationTypes.Add(vacationType)
            End While
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try
        Return vacationTypes
    End Function

End Class

