import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image,
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
