
Imports System.Data.Entity
Imports System.Data.Entity.Infrastructure
Imports System.Data.SqlClient

Imports System.Data.Sql
Imports System.IO
Imports System.Configuration

Public Class DepartmentRepository : Implements IDepartmentRepository
    Private connectionString As String

    Public Sub New()
        connectionString = ConfigurationManager.ConnectionStrings("InterActiveDBConnection").ConnectionString
    End Sub

    Public Function GetAllDepartments() As IEnumerable(Of Department) Implements IDepartmentRepository.GetAllDepartments
        Dim departments As New List(Of Department)
        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_GetList_Department", cn)
        cmd.CommandType = CommandType.StoredProcedure
        Try
            cn.Open()
            Dim reader As SqlDataReader = cmd.ExecuteReader()
            While reader.Read()
                Dim department As New Department()
                department.DepartmentId = Convert.ToInt16(reader("DepartmentId"))
                department.DepartmentName = reader("DepartmentName").ToString()
                department.DepartmentDescription = reader("DepartmentDescription").ToString()
                department.DepartmentPhone = reader("DepartmentPhone").ToString()
                department.DepartmentEmail = reader("DepartmentEmail").ToString()
                department.DepartmentAddress = reader("DepartmentAddress").ToString()
                department.Status = Convert.ToBoolean(reader("Status"))
                department.CreatedBy = reader("CreatedBy").ToString()
                department.CreatedDate = Convert.ToDateTime(reader("CreatedDate"))
                departments.Add(department)
            End While
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return departments
    End Function

    Public Function GetDepartment(id As Short) As Department Implements IDepartmentRepository.GetDepartment
        Dim department As New Department()

        Dim cn As New SqlConnection(connectionString)
        Dim cmd As New SqlCommand("sp_Get_Department", cn)
        cmd.CommandType = CommandType.StoredProcedure

        cmd.Parameters.AddWithValue("@DepartmentId", id)
        Try
            cn.Open()
            Dim reader As SqlDataReader = cmd.ExecuteReader()
            While reader.Read()
                department.DepartmentId = Convert.ToInt16(reader("DepartmentId"))
                department.DepartmentName = reader("DepartmentName").ToString()
                department.DepartmentDescription = reader("DepartmentDescription").ToString()
                department.DepartmentPhone = reader("DepartmentPhone").ToString()
                department.DepartmentEmail = reader("DepartmentEmail").ToString()
                department.DepartmentAddress = reader("DepartmentAddress").ToString()
                department.Status = Convert.ToBoolean(reader("Status"))
                department.CreatedBy = reader("CreatedBy").ToString()
                department.CreatedDate = Convert.ToDateTime(reader("CreatedDate"))
            End While
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return department
    End Function

    Public Function InsertDepartment(department As Department) As Department Implements IDepartmentRepository.InsertDepartment
        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_Insert_Department", cn)
        cmd.CommandType = CommandType.StoredProcedure

        cmd.Parameters.AddWithValue("@DepartmentName", department.DepartmentName)
        cmd.Parameters.AddWithValue("@DepartmentDescription", department.DepartmentDescription)
        cmd.Parameters.AddWithValue("@DepartmentPhone", department.DepartmentPhone)
        cmd.Parameters.AddWithValue("@DepartmentEmail", department.DepartmentEmail)
        cmd.Parameters.AddWithValue("@DepartmentAddress", department.DepartmentAddress)
        cmd.Parameters.AddWithValue("@Status", department.Status)
        cmd.Parameters.AddWithValue("@CreatedBy", department.CreatedBy)
        cmd.Parameters.AddWithValue("@DepartmentId", SqlDbType.SmallInt).Direction = ParameterDirection.Output

        Try
            cn.Open()
            cmd.ExecuteNonQuery()
            department.DepartmentId = cmd.Parameters("@DepartmentId").Value
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try

        Return department
    End Function

    Public Function UpdateDepartment(department As Department) As Boolean Implements IDepartmentRepository.UpdateDepartment
        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_Update_Department", cn)
        cmd.CommandType = CommandType.StoredProcedure

        cmd.Parameters.AddWithValue("@DepartmentId", department.DepartmentId)
        cmd.Parameters.AddWithValue("@DepartmentName", department.DepartmentName)
        cmd.Parameters.AddWithValue("@DepartmentDescription", department.DepartmentDescription)
        cmd.Parameters.AddWithValue("@DepartmentPhone", department.DepartmentPhone)
        cmd.Parameters.AddWithValue("@DepartmentEmail", department.DepartmentEmail)
        cmd.Parameters.AddWithValue("@DepartmentAddress", department.DepartmentAddress)
        cmd.Parameters.AddWithValue("@Status", department.Status)
        cmd.Parameters.AddWithValue("@CreatedBy", department.CreatedBy)

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

    Public Sub DeleteDepartment(id As Short) Implements IDepartmentRepository.DeleteDepartment
        Dim cn As New SqlConnection(connectionString)

        Dim cmd As New SqlCommand("sp_Delete_Department", cn)
        cmd.CommandType = CommandType.StoredProcedure

        cmd.Parameters.AddWithValue("@DepartmentId", id)
        Try
            cn.Open()
            cmd.ExecuteNonQuery()
        Catch ex As Exception
            Throw ex
        Finally
            cn.Close()
        End Try
    End Sub


End Class
