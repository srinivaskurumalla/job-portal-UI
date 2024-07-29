export interface tbl_Jobs {
    brId: string,
    designation: string,
    skills: string[],
    experience: number,
    status: boolean,
    location: string,
    spoc: string,
    empIds: number[],
    description: string,
    panelOpenState?: boolean;
    isApplied?: boolean;

}

export interface role {
    roleId: number
    roleName: string
}

export interface tbl_employee_profile {
    emp_ID: number
    emp_name: string
    email: string
    phone: number
    skills: string[]
    experience: number
    designation: string
    certifications: string[]
    current_Project: string

    current_BU: string

    location: string
    //  Resume(resume upload) shall we save in db or in project folder ?
    brId: string[]
}

export interface tbl_Jobs_Applied{
    applicationId:string,
    brId:string,
    empEmail:string,
    status:string,
    poc:string
    appliedDate:Date

}