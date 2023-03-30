export interface postMethod {
    // isActive: any
    programID: any
    ProgramName: string
    ProgramNumber: string
    ProgramBudget: number
    ProgramDescription: string
    IsVirtual: boolean
  }
  export interface editGetMethodPayload {
    canDelete: boolean
    isActive: boolean
    isVirtual: boolean
    programBudget: number
    programDescription: string
    programID: string
    programName: string
    programNumber: string
  }