Imports System.Net
Imports System.Net.Http
Imports System.Web.Http

Namespace Controllers
    Public Class VacationController
        Inherits ApiController

        Private _vacationRepository As New VacationTypeRepository()
        'POST api/Vacation/AddVacation
        <HttpPost>
        Function AddEmployeeVacation(ByVal employeeVacation As EmployeeVacation) As HttpResponseMessage

            employeeVacation = _vacationRepository.InsertEmployeeVacation(employeeVacation)
            Dim response As HttpResponseMessage = Request.CreateResponse(HttpStatusCode.Created, employeeVacation)
            response.Headers.Location = New Uri(Url.Link("DefaultApi", New With {.id = employeeVacation.EmployeeVacationId}))
            Return response
        End Function

        'GET api/Vacation/GetEmployeeVacations
        <HttpGet>
        Function GetEmployeeVacations(ByVal EmployeeId As Integer) As IEnumerable(Of EmployeeVacationView)
            Return _vacationRepository.GetAllEmployeeVacations(EmployeeId)
        End Function

        'GET api/Vacation/GetVacationTypes
        <HttpGet>
        Function GetVacationTypes() As IEnumerable(Of VacationType)
            Return _vacationRepository.GetAllVacationTypes()
        End Function
    End Class
End Namespace