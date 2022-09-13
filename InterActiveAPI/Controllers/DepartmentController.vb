Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports System.Web.Http.Cors

Namespace Controllers

    <EnableCors("*", "*", "*")>
    Public Class DepartmentController
        Inherits ApiController

        Private _repository As New DepartmentRepository()

        ' GET api/Department
        <HttpGet>
        Function GetDepartments() As IEnumerable(Of Department)
            Return _repository.GetAllDepartments()
        End Function

        ' GET api/Department/5
        <HttpGet>
        Function GetDepartment(ByVal id As Integer) As Department
            Dim Department As Department = _repository.GetDepartment(id)
            If Department Is Nothing Then
                Throw New HttpResponseException(HttpStatusCode.NotFound)
            End If
            Return Department
        End Function

        ' POST api/Department
        <HttpPost>
        Function PostDepartment(ByVal Department As Department) As HttpResponseMessage
            Department = _repository.InsertDepartment(Department)
            Dim response As HttpResponseMessage = Request.CreateResponse(HttpStatusCode.Created, Department)
            response.Headers.Location = New Uri(Url.Link("DefaultApi", New With {.id = Department.DepartmentId}))
            Return response
        End Function

        ' PUT: /api/Department
        <HttpPut>
        Function UpdateDepartment(ByVal Department As Department) As HttpResponseMessage
            If Not _repository.UpdateDepartment(Department) Then
                Throw New HttpResponseException(HttpStatusCode.NotFound)
            End If
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function

        ' DELETE api/Department/5
        <HttpDelete>
        Function DeleteDepartment(ByVal id As Integer) As HttpResponseMessage
            _repository.DeleteDepartment(id)
            Return Request.CreateResponse(HttpStatusCode.OK)
        End Function


    End Class
End Namespace