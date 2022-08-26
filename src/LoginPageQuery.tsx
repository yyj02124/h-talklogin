import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import LoginField from './LoginField';
import { CertLoginTypes, LoginFormValues } from './service/loginTypes';

const LoginPageQuery = () => {
    const { handleSubmit, control } = useForm<LoginFormValues>({
        defaultValues: {
          email: '',
          password: '',
          certNumber: undefined,
        },
      });

    const loginMutation = useMutation((data)=> axios.post('https://htalk-api.helixtech.co.kr/auth/v1/cert/pw',data),{
        onSuccess: () =>{
            console.log('success')
        }
    })
    const getCertMutation = useMutation((data)=>axios.post('https://htalk-api.helixtech.co.kr/auth/v1/cert/confirm/pw',data),{
        onSuccess: () =>{
            console.log('success')
        }
    })
    const getUserInformMutation = useMutation((data)=>axios.post('https://htalk-api.helixtech.co.kr/auth/v1/login/pw',data),{
        onSuccess: () =>{
            console.log('success')
        }
    })

    const onSubmit = useCallback((data:LoginFormValues) => {

        const certLogin:CertLoginTypes= {
            certType:'LOGIN',
            email: data.email,
            password:data.password,
          }

        loginMutation.mutate(certLogin)

    },[loginMutation])
  return (
    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <Typography>H-Talk LoginPage</Typography>
      
      <form onSubmit={handleSubmit((data) => {
        onSubmit(data)
        })}>
        <LoginField label="아이디" control={control} name='email' type="Login"></LoginField>
        <LoginField label="비밀번호" control={control} name="password" type="Password"></LoginField>
        <LoginField label="인증번호" control={control} name="certNumber" type="Login"></LoginField>
        <Button variant='contained' sx={{mt: '20px' ,backgroundColor:'#000000', width:'352px'}} type='submit'>
        로그인
      </Button>
      </form>

    </Box>
  )
}

export default LoginPageQuery