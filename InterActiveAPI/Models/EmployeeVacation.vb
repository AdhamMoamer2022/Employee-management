Public Class EmployeeVacation : Inherits AuditableTenantEntity
    Private _EmployeeVacationId As Integer
    Private _VacationTypeId As short
    Private _EmployeeId As Integer
    Private _StartDate As Date
    Private _EndDate As Date
    private _ApprovedBy As Integer
    private _ApprovedDate As Date

    Public Property EmployeeVacationId() As Integer
        Get
            Return _EmployeeVacationId
        End Get
        Set(value As Integer)
            _EmployeeVacationId = value
        End Set
    End Property

    Public Property VacationTypeId() As Integer
        Get
            Return _VacationTypeId
        End Get
        Set(value As Integer)
            _VacationTypeId = value
        End Set
    End Property

    Public Property EmployeeId() As Integer
        Get
            Return _EmployeeId
        End Get
        Set(value As Integer)
            _EmployeeId = value
        End Set
    End Property

    Public Property StartDate() As Date
        Get
            Return _StartDate
        End Get
        Set(value As Date)
            _StartDate = value
        End Set
    End Property

    Public Property EndDate() As Date
        Get
            Return _EndDate
        End Get
        Set(value As Date)
            _EndDate = value
        End Set
    End Property

    Public Property ApprovedBy() As Integer
        Get
            Return _ApprovedBy
        End Get
        Set(value As Integer)
            _ApprovedBy = value
        End Set
    End Property

    Public Property ApprovedDate() As Date
        Get
            Return _ApprovedDate
        End Get
        Set(value As Date)
            _ApprovedDate = value
        End Set
    End Property

End Class
