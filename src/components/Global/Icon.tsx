import { Box } from "@mui/material"
import Image from "next/image"

export const ImgIcon = ({height, width, path}: {height?: string, width?: string, path: "/icons/github.svg" | "/icons/linkedin.svg" | "/icons/twitter.svg" | "/icons/instagram.svg"}) => {
    return (
        <Box
            sx={{
                width: width ?? 30,
                height: height ?? 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }}
        >
            <Image 
                src={path}
                alt={path.split("/")[1].split(".")[0]}
                layout="fill"
            />
        </Box>
    )
}