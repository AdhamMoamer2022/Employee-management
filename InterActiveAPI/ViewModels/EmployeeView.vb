Public Class EmployeeView : Inherits Employee
    Private _DepartmentName As String

    Public Property DepartmentName() As String
        Get
            Return _DepartmentName
        End Get
        Set(ByVal value As String)
            _DepartmentName = value
        End Set
    End Property
End Class
