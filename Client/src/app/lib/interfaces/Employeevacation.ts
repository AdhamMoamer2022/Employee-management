
export interface EmployeeVacation {
    VacationTypeId: number;
    VacationType: string;
    EmployeeId: number;
    StartDate: Date;
    EndDate: Date;
    CreatedBy: number;
    CreatedDate: Date;
    ApprovedBy: number;
    ApprovedDate: Date;
    VacationDays:string;
}