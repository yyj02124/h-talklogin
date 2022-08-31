import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { LoginFormValues } from "./service/loginTypes";

const validationSchema = yup.object({
  email: yup.string().email("이메일이 이상합니다.").required("Required"),
  password: yup.string().required("Required"),
  certNumber: yup.string().matches(/^\d{6}$/, "6자리 입력"),
});

const FormikLoginPage = () => {
  const [checkVal, setCheckVal] = useState<boolean>(false);
  const date = Date.now();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
      certNumber: "",
    },
  });

  const onsubmit = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Controller name="email" control={control} render={({ field }) => <TextField {...field} />}></Controller>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <TextField type="password" {...field} />}
        ></Controller>
        <Controller name="certNumber" control={control} render={({ field }) => <TextField {...field}></TextField>} />
        <Button type="submit">제출</Button>
      </form>
    </Box>
  );
};

export default FormikLoginPage;
