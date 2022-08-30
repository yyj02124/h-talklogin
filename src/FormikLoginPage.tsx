import { Button, TextField, Typography } from "@mui/material";
import { differenceInSeconds } from "date-fns";
import { useFormik } from "formik";
import { useState } from "react";
import { DATE_DIFF } from "./LoginPage";
import { getHtalkApi, getLoginApi } from "./service/login";
import { CertLoginTypes } from "./service/loginTypes";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("이메일이 이상합니다.").required("Required"),
  certNumber: yup.string().matches(/^\d{6}$/, "6자리 입력"),
});

const FormikLoginPage = () => {
  const [checkVal, setCheckVal] = useState<boolean>(false);
  const date = Date.now();

  const getCertNumFunc = (data: CertLoginTypes): void => {
    getLoginApi(data);

    const dateCheck = differenceInSeconds(date, new Date()) < DATE_DIFF;

    if (dateCheck) {
      setCheckVal(dateCheck);
    }
  };

  //   const loginFunc = (data: CertLoginTypes) => {
  //     getHtalkApi(data, data);
  //   };

  const formik = useFormik({
    initialValues: {
      certType: "LOGIN",
      email: "",
      password: "",
      certNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      {
        checkVal ? getHtalkApi(values, values) : getCertNumFunc(values);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography>Email Address</Typography>
      <TextField
        id="email"
        name="email"
        placeholder="이메일"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {checkVal && (
        <TextField
          id="certNumber"
          name="certNumber"
          placeholder="인증번호"
          onChange={formik.handleChange}
          value={formik.values.certNumber}
          error={formik.touched.certNumber && Boolean(formik.errors.certNumber)}
          helperText={formik.touched.certNumber && formik.errors.certNumber}
        />
      )}
      <Button type="submit">제출</Button>
    </form>
  );
};

export default FormikLoginPage;
