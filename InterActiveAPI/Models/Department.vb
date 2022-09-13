Public Class Department : Inherits AuditableTenantEntity
    Private _DepartmentId As Short
    Private _DepartmentName As String
    Private _DepartmentDescription As String
    Private _DepartmentPhone As String
    Private _DepartmentEmail As String
    Private _DepartmentAddress As String

    Public Property DepartmentId() As Short
        Get
            Return _DepartmentId
        End Get
        Set(value As short)
            _DepartmentId = value
        End Set
    End Property

    Public Property DepartmentName() As String
        Get
            Return _DepartmentName
        End Get
        Set(value As String)
            _DepartmentName = value
        End Set
    End Property

    Public Property DepartmentDescription() As String
        Get
            Return _DepartmentDescription
        End Get
        Set(value As String)
            _DepartmentDescription = value
        End Set
    End Property
    
    Public Property DepartmentPhone() As String
        Get
            Return _DepartmentPhone
        End Get
        Set(value As String)
            _DepartmentPhone = value
        End Set
    End Property

    Public Property DepartmentEmail() As String
        Get
            Return _DepartmentEmail
        End Get
        Set(value As String)
            _DepartmentEmail = value
        End Set
    End Property

    Public Property DepartmentAddress() As String
        Get
            Return _DepartmentAddress
        End Get
        Set(value As String)
            _DepartmentAddress = value
        End Set
    End Property

End Class

