Public Interface IEmployeeRepository

    Function GetAllEmployees() As IEnumerable(Of EmployeeView)

    Function GetEmployee(ByVal id As Integer) As EmployeeView

    Function InsertEmployee(ByVal employee As Employee) As Employee

    Function UpdateEmployee(ByVal employee As Employee) As Boolean

    Function DeleteEmployee(ByVal id As Integer) As Boolean

    Function CalculateSalary(ByVal Employeeid As Integer, ByVal month As Integer, ByVal year As Integer) As Integer


End Interface


