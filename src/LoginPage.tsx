import { Box, Button, TextField, Typography } from "@mui/material";
import { differenceInSeconds } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoginField from "./LoginField";
import { getHtalkApi, getLoginApi } from "./service/login";
import { CertLoginTypes, LoginFormValues, LoginTypes } from "./service/loginTypes";

export const DATE_DIFF = 60;

const LoginPage = () => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputCertNum, setInputCertNum] = useState<string>("");
  const [checkVal, setCheckVal] = useState<boolean>(false);
  const date = Date.now();

  const { handleSubmit, control, register, setValue, watch } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      certNumber: undefined,
    },
  });

  // const handleLogin = (data: LoginFormValues) => {
  //   const certLogin: CertLoginTypes = {
  //     certType: "LOGIN",
  //     email: data.email,
  //     password: data.password,
  //   };

  //   getLoginApi(certLogin);

  //   const dateCheck = differenceInSeconds(date, new Date()) < DATE_DIFF;

  //   if (dateCheck) {
  //     setCheckVal(dateCheck);
  //   }
  // };

  // const handleCertLogin = (data: LoginFormValues) => {
  //   const certNumLogin: CertLoginTypes = {
  //     certType: "LOGIN",
  //     email: data.email,
  //     password: data.password,
  //     certNumber: data.certNumber,
  //   };

  //   const certIdLogin: LoginTypes = {
  //     certType: "LOGIN",
  //     email: data.email,
  //     password: data.password,
  //   };

  //   getHtalkApi(certNumLogin, certIdLogin);

  //   console.log(data);
  // };

  const { email, password, certNumber } = watch();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name) => {
  //   setValue(name, e.target.value);
  // };

  const getCertNumFunc = (e: React.FormEvent<HTMLFormElement>): void => {
    const eventTarget = e.target as HTMLFormElement;

    e.preventDefault();
    const certLogin: CertLoginTypes = {
      certType: "LOGIN",
      email: inputEmail,
      password: inputPassword,
    };

    console.log(certLogin);
    getLoginApi(certLogin);

    const dateCheck = differenceInSeconds(date, new Date()) < DATE_DIFF;

    if (dateCheck) {
      setCheckVal(dateCheck);
    }
  };

  const LoginFunc = (e: React.FormEvent<HTMLFormElement>): void => {
    const eventTarget = e.target as HTMLFormElement;
    e.preventDefault();

    const certNumLogin: CertLoginTypes = {
      certType: "LOGIN",
      email: eventTarget.email.value,
      password: eventTarget.password.value,
      certNumber: eventTarget.certNumber.value,
    };

    const certIdLogin: LoginTypes = {
      certType: "LOGIN",
      email: eventTarget.email.value,
      password: eventTarget.password.value,
    };

    console.log(certNumLogin, certIdLogin);
    getHtalkApi(certNumLogin, certIdLogin);
  };

  const handleInputEmailEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleInputPasswordEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(e.target.value);
  };
  const handleInputCertNumEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCertNum(e.target.value);
  };

  return (
    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <Typography>H-Talk LoginPage</Typography>
      <form onSubmit={checkVal ? LoginFunc : getCertNumFunc}>
        <input type="search" name="email" placeholder="이메일" value={inputEmail} onChange={handleInputEmailEvent} />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={inputPassword}
          onChange={handleInputPasswordEvent}
        />
        {checkVal && <input type="search" name="certNumber" value={inputCertNum} onChange={handleInputCertNumEvent} />}
        <Button type="submit">제출</Button>
      </form>

      {/* <form onSubmit={handleSubmit(checkVal ? (data) => handleCertLogin(data) : (data) => handleLogin(data))}>
        { <form onSubmit={handleSubmit(async (data) => handleLogin(data))}> 
        <LoginField label="이메일" name="email" type="Login" control={control} />
        <LoginField label="비밀번호" control={control} name="password" type="Password" />
        {checkVal && <LoginField label="인증번호" control={control} name="certNumber" type="Login" />}

        <Button variant="contained" sx={{ mt: "20px", backgroundColor: "#000000", width: "352px" }} type="submit">
          로그인
        </Button>
      </form> */}
    </Box>
  );
};

export default LoginPage;
