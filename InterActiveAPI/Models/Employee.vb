Public Class Employee : Inherits AuditableTenantEntity
    Private _EmployeeIdId As Integer
    Private _FirstName As String
    Private _LastName As String
    Private _DepartmentId As short
    Private _Salary As Integer
    Private _Balance As Integer
    Private _HireDate As DateTime
    Private _Position As Boolean
    Private _CellPhone As String
    Private _Email As String
    Private _Address As String


    Public Property EmployeeId() As Integer
        Get
            Return _EmployeeIdId
        End Get
        Set(value As Integer)
            _EmployeeIdId = value
        End Set
    End Property

    Public Property FirstName() As String
        Get
            Return _FirstName
        End Get
        Set(value As String)
            _FirstName = value
        End Set
    End Property

    Public Property LastName() As String
        Get
            Return _LastName
        End Get
        Set(value As String)
            _LastName = value
        End Set
    End Property

    Public Property DepartmentId() As short
        Get
            Return _DepartmentId
        End Get
        Set(value As short)
            _DepartmentId = value
        End Set
    End Property

    Public Property Salary() As Integer
        Get
            Return _Salary
        End Get
        Set(value As Integer)
            _Salary = value
        End Set
    End Property

    Public Property Balance() As Integer
        Get
            Return _Balance
        End Get
        Set(value As Integer)
            _Balance = value
        End Set
    End Property

    Public Property HireDate() As DateTime
        Get
            Return _HireDate
        End Get
        Set(value As DateTime)
            _HireDate = value
        End Set
    End Property

    Public Property Position() As Boolean
        Get
            Return _Position
        End Get
        Set(value As Boolean)
            _Position = value
        End Set
    End Property

    Public Property CellPhone() As String
        Get
            Return _CellPhone
        End Get
        Set(value As String)
            _CellPhone = value
        End Set
    End Property

    Public Property Email() As String
        Get
            Return _Email
        End Get
        Set(value As String)
            _Email = value
        End Set
    End Property

    Public Property Address() As String
        Get
            Return _Address
        End Get
        Set(value As String)
            _Address = value
        End Set
    End Property

End Class
