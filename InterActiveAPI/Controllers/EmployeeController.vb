Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports System.Web.Http.Cors

Namespace Controllers
    <EnableCors("*", "*", "*")>
    Public Class EmployeeController
        Inherits ApiController

        Private _repository As New EmployeeRepository()

        ' GET api/Employee
        <HttpGet>
        Function GetEmployees() As IEnumerable(Of EmployeeView)
            Return _repository.GetAllEmployees()
        End Function

        ' GET api/Employee/5
        <HttpGet>
        Function GetEmployee(ByVal id As Integer) As EmployeeView
            Dim employee As EmployeeView = _repository.GetEmployee(id)
            If employee Is Nothing Then
                Throw New HttpResponseException(HttpStatusCode.NotFound)
            End If
            Return employee
        End Function

        ' POST api/Employee
        <HttpPost>
        Function PostEmployee(ByVal employee As Employee) As HttpResponseMessage
            employee = _repository.InsertEmployee(employee)
            Dim response As HttpResponseMessage = Request.CreateResponse(HttpStatusCode.Created, employee)
            response.Headers.Location = New Uri(Url.Link("DefaultApi", New With {.id = employee.EmployeeId}))
            Return response
        End Function

        ' PUT: /api/Employee
        <HttpPut>
        Function UpdateEmployee(ByVal employee As Employee) As HttpResponseMessage
            If Not _repository.UpdateEmployee(employee) Then
                Throw New HttpResponseException(HttpStatusCode.NotFound)
            End If
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

        ' DELETE api/Employee/5
        <HttpDelete>
        Function DeleteEmployee(ByVal id As Integer) As HttpResponseMessage
            _repository.DeleteEmployee(id)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

        'GET api/Employee/CalculateSalary
        <HttpGet>
        Function CalculateSalary(ByVal Employeeid As Integer, ByVal month As Integer, ByVal year As Integer) As Integer
            Return _repository.CalculateSalary(Employeeid, month, year)
        End Function

    End Class
End Namespace

