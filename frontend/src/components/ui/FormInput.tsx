import { InputAdornment, Stack, Input, Typography} from "@mui/material";
import type { ReactNode } from "react";
import type { ChangeEvent } from "react";

interface FormInputProps {
  placeholder: string;
  icon: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  helper?: string; 
  type?: "password" | "numeric" | "rut";
  data_testid?: string;
}

const FormInput = ({placeholder, icon, onChange, value, helper, type, data_testid}: FormInputProps) => {
  return (
    <Stack display="flex" flexDirection="column" alignItems="left" textAlign="left" gap={0.5}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type === "password" ? type : undefined }
        inputProps={
          type === "numeric" ? { inputMode: 'numeric', pattern: '[0-9]*' } :
          type === "rut" ? { inputMode: 'text', pattern: '[0-9kK]*' } : undefined
        }        
        required
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        }
        sx={{
          height: 45, 
          padding: '0px 15px',
          backgroundColor: 'white',
          border: '1px solid #aaaaaaff',
          borderRadius: '4px',
          '& input': {
            padding: 0,
            height: '100%',
          },
          '&:before, &:after': {
            display: 'none', 
          }
        }}
        data-testid={data_testid}
      />
      { helper ? 
        <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: 12, ml: 0.2 }}>
          {helper}
        </Typography> : <></>
      }
    </Stack>
  )
}              
export default FormInput;