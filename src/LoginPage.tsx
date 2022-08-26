import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import LoginField from "./LoginField";
import { getHtalkApi } from "./service/login";
import { CertLoginTypes, LoginFormValues, LoginTypes } from "./service/loginTypes";

const LoginPage = () => {
  const { handleSubmit, control } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      certNumber: undefined,
    },
  });

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
    }

    getHtalkApi(certLogin,certNumLogin,certIdLogin)
  }

  return (

    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <Typography>H-Talk LoginPage</Typography>
      
      <form onSubmit={handleSubmit(handleLogin)}>

        <TextField type='text' label ></TextField>
        <LoginField label="이메일" control={control} name="email" type="Login"></LoginField>
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
