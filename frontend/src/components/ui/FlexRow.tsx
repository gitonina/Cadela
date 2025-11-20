import type { ReactNode } from "react";
import { Box } from "@mui/material";

interface FlexRowProps {
  gap?: number
  cursor?: string
  children: ReactNode
  onClick?: () => void
}

const FlexRow = ({ children, gap=0, cursor="auto", onClick}: FlexRowProps) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: gap,
        cursor: cursor,
      }}
    > 
      {children}
    </Box>
  )
} 

export default FlexRow;