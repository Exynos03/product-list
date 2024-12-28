import { Stack, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Switch component
export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 0,
  display: "flex",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  borderRadius: "33.65px",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 18,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(18px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(18px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#0F172A",
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 18,
    height: 18,
    borderRadius: 9,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#E2E8F0" : "#E2E8F0",
    border: "none",
    boxSizing: "border-box",
  },
}));

// Type definition for props
interface AntSwitchProps {
  text?: string;
  // Include the rest of the Switch props here (optional)
  [key: string]: any;
}

// AntSwitch component with type
const AntSwitch: React.FC<AntSwitchProps> = ({ text, ...rest }) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ py: 1 }}
      style={{ cursor: "pointer", zIndex: "1" }}
    >
      <StyledSwitch {...rest} />
      <Typography sx={{ px: 3 }} display="none">
        {text}
      </Typography>
    </Stack>
  );
};

export default AntSwitch;
