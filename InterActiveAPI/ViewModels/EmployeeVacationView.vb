Public Class EmployeeVacationView : Inherits EmployeeVacation

    Private _VacationType As String
    Private _VacationDays As Integer

    Public Property VacationDays() As String
        Get
            Return _VacationDays
        End Get
        Set(ByVal value As String)
            _VacationDays = value
        End Set
    End Property

    Public Property VacationType() As String
        Get
            Return _VacationType
        End Get
        Set(ByVal value As String)
            _VacationType = value
        End Set
    End Property

End Class


