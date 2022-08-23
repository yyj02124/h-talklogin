import axios from "axios"
import { CertLoginTypes, LoginTypes } from "./loginTypes"

const baseUrl = `https://htalk-api.helixtech.co.kr`

export const getHTalkCertApi = async (request:CertLoginTypes,endPoint:string) => {
    let url = `${baseUrl}${endPoint}`
    return axios
      .post(url,request,{
        headers:{'App-Agent' : 'AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB'}
      })
      .then(( res ) => {
        const result =  res.data
        console.log(result)
        localStorage.setItem('app-storage',result.certId)
        return res.data
      })
      .catch((err) => {
        console.error(err)
        throw new Error(err.message)
      })
  }

  export const getHTalkLoginApi = async (request:LoginTypes,endPoint:string) => {
    let url = `${baseUrl}${endPoint}`
    return axios
      .post(url,request,{
        headers:{'App-Agent' : 'AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB'}
      })
      .then(( res ) => {
        return res.data
      })
      .catch((err) => {
        console.error(err)
        throw new Error(err.message)
      })
  }