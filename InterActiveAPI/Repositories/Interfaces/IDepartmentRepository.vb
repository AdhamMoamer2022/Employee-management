Public Interface IDepartmentRepository
    Function GetAllDepartments() As IEnumerable(Of Department)
    Function GetDepartment(ByVal id As short) As Department
    Function InsertDepartment(ByVal department As Department) As Department
    Function UpdateDepartment(ByVal department As Department) As Boolean
    Sub DeleteDepartment(ByVal id As short)
End Interface
