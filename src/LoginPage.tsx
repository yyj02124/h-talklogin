import { Box, Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import LoginField from "./LoginField";
import { getHtalkApi, getUserInformationApi } from "./service/login";
import { CertLoginTypes, LoginTypes } from "./service/loginTypes";
import { useStore } from "./store";

export type LoginFormValues = {
  email: string
  password: string
  certNumber?: string
}

const LoginPage = () => {
  const { handleSubmit, control } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      certNumber: undefined,
    },
  });
  // const [certId,setCertId] = useState<string|null>('');
  const setCertId = useStore((state)=>state.setCertId)

  const handleLogin = (data:LoginFormValues) => {

    const certLogin:CertLoginTypes = {
      certType:'LOGIN',
      email: data.email,
      password:data.password,
    }

    const certNumLogin:CertLoginTypes = {
      certType:'LOGIN',
      email: data.email,
      password:data.password,
      certNumber:data.certNumber
    }
    
    const certIdLogin:LoginTypes = {
      certType:'LOGIN',
      email: data.email,
      password:data.password,
      certId:localStorage.getItem('app-storage')
    }

    getHtalkApi(certLogin,certNumLogin,certIdLogin)
  }

  return (
    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <Typography>H-Talk LoginPage</Typography>
      
      <form onSubmit={handleSubmit((data) => {
        handleLogin(data)
        })}>
        <LoginField label="아이디" control={control} name='email' type="Login"></LoginField>
        <LoginField label="비밀번호" control={control} name="password" type="Password"></LoginField>
        <LoginField label="인증번호" control={control} name="certNumber" type="Login"></LoginField>
        <Button variant='contained' sx={{mt: '20px' ,backgroundColor:'#000000', width:'352px'}} type='submit'>
        로그인
      </Button>
      </form>
      
    </Box>
  );
};

export default LoginPage;
