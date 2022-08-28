import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoginField from "./LoginField";
import { getHtalkApi } from "./service/login";
import { CertLoginTypes, LoginFormValues, LoginTypes } from "./service/loginTypes";

const LoginPage = () => {
  const [inputEle, setInputEle] = useState("");
  const { handleSubmit, control } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      certNumber: undefined,
    },
  });

  const handleLogin = (data: LoginFormValues) => {
    const certLogin: CertLoginTypes = {
      certType: "LOGIN",
      email: data.email,
      password: data.password,
    };

    const certNumLogin: CertLoginTypes = {
      certType: "LOGIN",
      email: data.email,
      password: data.password,
      certNumber: data.certNumber,
    };

    const certIdLogin: LoginTypes = {
      certType: "LOGIN",
      email: data.email,
      password: data.password,
    };

    getHtalkApi(certLogin, certNumLogin, certIdLogin);
    console.log(data);
  };

  const submitFunc = (e: React.FormEvent<HTMLFormElement>): void => {
    const eventTarget = e.target as HTMLFormElement;

    e.preventDefault();
    console.log(eventTarget.title.value);
  };

  const handleEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEle(e.target.value);
  };

  return (
    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <Typography>H-Talk LoginPage</Typography>
      <form onSubmit={submitFunc}>
        <TextField variant="outlined" type="search" name="title" value={inputEle} onChange={handleEvent} />
        <Button type="submit">제출</Button>
      </form>

      <form onSubmit={handleSubmit(handleLogin)}>
        {/* <form onSubmit={handleSubmit((data) => handleLogin(data))}> */}
        <LoginField label="이메일" control={control} name="email" type="Login"></LoginField>
        <LoginField label="비밀번호" control={control} name="password" type="Password"></LoginField>
        <LoginField label="인증번호" control={control} name="certNumber" type="Login"></LoginField>
        <Button variant="contained" sx={{ mt: "20px", backgroundColor: "#000000", width: "352px" }} type="submit">
          로그인
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
