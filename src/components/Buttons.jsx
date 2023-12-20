import { useColorMode, IconButton, Tooltip } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ThemeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = colorMode === "dark" ? <MoonIcon /> : <SunIcon />;
  const label =
    colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  return (
    <Tooltip label={label} placement='auto-start'>
      <IconButton
        icon={icon}
        variant="ghost"
        aria-label={label}
        onClick={toggleColorMode}
      />
    </Tooltip>
  );
};
