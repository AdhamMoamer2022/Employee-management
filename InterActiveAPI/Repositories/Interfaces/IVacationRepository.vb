Public Interface IVacationRepository

    Function GetAllEmployeeVacations(ByVal id As Integer) As IEnumerable(Of EmployeeVacationView)
    Function GetAllVacationTypes() As IEnumerable(Of VacationType)
    Function GetVacationType(ByVal id As Integer) As VacationType
    Function GetEmployeeVacationPerMonth(ByVal id As Integer, ByVal month As Integer, ByVal year As Integer) As IEnumerable(Of EmployeeVacation)
    Function InsertEmployeeVacation(ByVal employeeVacation As EmployeeVacation) As EmployeeVacation
    Function UpdateEmployeeVacation(ByVal employeeVacation As EmployeeVacation) As Boolean
    Sub DeleteEmployeeVacation(ByVal id As Integer)


End Interface
