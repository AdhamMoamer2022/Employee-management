Public Class VacationType : Inherits AuditableTenantEntity
    Private _VacationTypeId As Integer
    Private _VacationType As String
    Private _Status As Boolean
    Private _Description As String
    Private _DailyDeductionPercentage As Short
    Private _MaximumAllowedDays As Integer

    Public Property VacationTypeId() As Integer
        Get
            Return _VacationTypeId
        End Get
        Set(value As Integer)
            _VacationTypeId = value
        End Set
    End Property

    Public Property VacationType() As String
        Get
            Return _VacationType
        End Get
        Set(value As String)
            _VacationType = value
        End Set
    End Property

    Public Property Description() As String
        Get
            Return _Description
        End Get
        Set(value As String)
            _Description = value
        End Set
    End Property

    Public Property DailyDeductionPercentage() As Short
        Get
            Return _DailyDeductionPercentage
        End Get
        Set(value As Short)
            _DailyDeductionPercentage = value
        End Set
    End Property

    Public Property MaximumAllowedDays() As Integer
        Get
            Return _MaximumAllowedDays
        End Get
        Set(value As Integer)
            _MaximumAllowedDays = value
        End Set
    End Property

End Class
