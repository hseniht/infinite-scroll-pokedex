import { Flex, Box, Text, Spacer } from "@chakra-ui/react";
import { ThemeButton } from "./Buttons";
const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p={4}
      //   gap={2}
      //   bg="teal.500"
      //   color="white"
    >
      {/* Logo (Left) */}
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          Logo
        </Text>
      </Box>

      <Spacer />

      <Text fontSize="xl" fontWeight="bold">
        PokeDex
      </Text>

      <Spacer />
      <Box>
        <ThemeButton />
      </Box>
    </Flex>
  );
};

export default Navbar;
