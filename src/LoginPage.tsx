import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoginField from "./LoginField";
import { getHTalkCertApi, getHTalkLoginApi } from "./service/login";
import { CertLoginTypes, LoginTypes } from "./service/loginTypes";



const LoginPage = () => {
  const { handleSubmit, control } = useForm();
  const [certId,setCertId] = useState<string|null>('');

  const handleLogin = (data:any) => {

    const loginData:CertLoginTypes = {
      certType:'LOGIN',
      email: data.Login,
      password:data.Password,
    }

    getHTalkCertApi(loginData,`/auth/v1/cert/pw`)
  }

  const handleCertLogin = (data:any) => {

    const loginData:CertLoginTypes = {
      certType:'LOGIN',
      email: data.Login,
      password:data.Password,
      certNumber:data.CertNum
    }

    getHTalkCertApi(loginData,`/auth/v1/cert/confirm/pw`)
  
    setCertId(localStorage.getItem('app-storage'))
  }

  const handleLoginPw = (data:any) => {

    const loginData:LoginTypes = {
      certType:'LOGIN',
      email: data.Login,
      password:data.Password,
      certId:localStorage.getItem('app-storage')
    }

    getHTalkLoginApi(loginData,`/auth/v1/login/pw`)
  }



  return (
    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <Typography>H-Talk LoginPage</Typography>
      <form onSubmit={handleSubmit((data) => {
        handleLogin(data)
        handleCertLogin(data)
        handleLoginPw(data)
        })}>
        <LoginField label="아이디" control={control} name="Login" type="Login"></LoginField>
        <LoginField label="비밀번호" control={control} name="Password" type="Password"></LoginField>
        <LoginField label="인증번호" control={control} name="CertNum" type="Login"></LoginField>
        <Button variant='contained' sx={{mt: '20px'}} type='submit'>
        로그인
      </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
