import { Button } from "@mui/material";

interface TopBarButtonProps {
  onClick?: () => void
  text: string
}

const TopBarButton = ({ text, onClick}: TopBarButtonProps) => {
  return (
    <Button 
      color="inherit" 
      onClick={onClick} 
      sx={{ 
        textTransform: 'none',
        fontSize: 16 
      }}
    >
      {text}
    </Button>
  )
} 

export default TopBarButton;