export interface CertTypes{
    certType:string,
    email:string,
    password:string,
}

export interface LoginTypes extends CertTypes{
    certId?: string | null
}

export interface CertLoginTypes extends CertTypes{
    certNumber?:string
}

export type LoginFormValues = {
    email: string
    password: string
    certNumber?: string
  }
  
