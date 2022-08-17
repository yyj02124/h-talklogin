import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoginField from "./LoginField";

const LoginPage = () => {
  const { handleSubmit, control } = useForm();
  return (
    <Box sx={{ width: "560px", height: "365px", backgroundColor: "#f5f9fe" }}>
      <Typography>H-Talk LoginPage</Typography>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <LoginField label="아이디" control={control} name="Login" type="Login"></LoginField>
        <LoginField label="비밀번호" control={control} name="Password" type="Password"></LoginField>
        <input type="submit" />
      </form>
    </Box>
  );
};

export default LoginPage;
