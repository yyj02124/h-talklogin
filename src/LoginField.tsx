import { Box, TextField, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface props {
  label: string;
  control: Control;
  name: string;
  rules?: Object;
  type: string;
}

const LoginField = ({ label, control, name, rules, type }: props) => {
  return (
    <Box>
      <Typography>{label}</Typography>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => <TextField {...field} type={type} />}
      />
    </Box>
  );
};

export default LoginField;
