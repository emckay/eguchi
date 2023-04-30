import { Image } from "@chakra-ui/next-js";
import { HStack, Heading } from "@chakra-ui/react";
import Logo from "@/public/images/logo.png";
import { Link } from "@chakra-ui/next-js";

export const NavBar = () => {
  return (
    <Link href="/" flex={1} sx={{ "&:hover": { textDecoration: "none" } }}>
      <HStack spacing={6} width="100%">
        <Image src={Logo} alt="Logo" height={70} />
        <Heading size={["lg", "xl"]} textTransform="uppercase">
          Eguchi Method
        </Heading>
      </HStack>
    </Link>
  );
};
