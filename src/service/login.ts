import axios from "axios"
import { CertLoginTypes, LoginTypes } from "./loginTypes"

const baseUrl = `https://htalk-api.helixtech.co.kr`

export const getHTalkCertApi = async (request:CertLoginTypes,endPoint:string) => {
    let url = `${baseUrl}${endPoint}`
    return await axios
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

  // export const getHTalkLoginApi = async (request:LoginTypes,endPoint:string) => {
  //   let url = `${baseUrl}${endPoint}`
  //   return axios
  //     .post(url,request,{
  //       headers:{'App-Agent' : 'AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB'}
  //     })
  //     .then(( res ) => {
  //       return res.data
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //       throw new Error(err.message)
  //     })
  // }

  export const getHtalkApi = async(request:CertLoginTypes,endPoint:string) =>{
    let url = `${baseUrl}${endPoint}`
    try{
      const certNumberResponse = await axios.post(url,request,{
        headers:{'App-Agent' : 'AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB'}
      })
      const certId = certNumberResponse.data.certId
      console.log(certId)
      localStorage.setItem('app-storage',certId)

    }catch(err){
      console.error('Error:::',err)
    }
  }

  export const getHTalkLoginApi = async (request:LoginTypes,endPoint:string) => {
    let url = `${baseUrl}${endPoint}`
    try{
      const getUserInform = await axios.post(url,request,{
        headers:{'App-Agent' : 'AppVersion:1.0.0;DeviceType:PC;DeviceAuthType:WEB'}
      })
      const userInform = getUserInform.data
      console.log(userInform)
      return userInform
    }catch(err){
      console.error('Error:::',err)
    }
  }