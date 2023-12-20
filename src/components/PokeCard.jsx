import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image,
  useColorMode,
} from "@chakra-ui/react";

export const PokeCard = ({ name, imgSrc }) => {
  return (
    <Card
      as="li"
      w="100%"
      h="100%"
      minW="140px"
      minH="140px"
      alignItems="center"
      //   _hover={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      _hover={{
        boxShadow: "outline",
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <CardBody>
        <Heading size="xs" textTransform="uppercase">
          {name}
        </Heading>
        <Image src={imgSrc} alt={name} />
      </CardBody>
    </Card>
  );
};
