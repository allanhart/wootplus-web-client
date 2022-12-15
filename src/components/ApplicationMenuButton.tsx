import Button from "@mui/material/Button";

import AppLogo from 'media/app-logo.svg';


export default function ApplicationMenuButton() {
  return (
    <Button color="inherit" sx={{ width: 140 }}>
      <AppLogo />
    </Button>
  );
}
