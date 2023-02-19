import react, { useState } from "react";
import styles from "./register.module.scss";
import axios from "axios";
import LOGO from "../../assets/LOGO.svg";
import {
  Container,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TitleInput } from "../../components/titleInput/TitleInput";
import { TitlePasswordInput } from "../../components/titlePasswordInput/TitlePasswordInput";
import { Link } from "react-router-dom";

interface IProps {
  message?: string;
}

export const Register: React.FC<IProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<IProps>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const userRegister = async () => {
    await axios
      .post("http://localhost:5000/register", { userName: name, userEmail: email, userPassword: password })
      .then((res) => {
        setData(res.data);
        onOpen();
      })
      .catch((error) => {
        toast({
          title: "ERROR",
          description: error?.response?.data?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <main className={styles.registerMain} data-testid={"RegisterPage"}>
      <div className={styles.registerLogoContainer}>
        <img
          className={styles.registerLogoImg}
          src={LOGO}
          alt={"Logo of Girsu's Kingdom. Is an automata girl holding an Scythe"}
        />
      </div>
      <div className={styles.registerContainerDiv}>
        <Container>
          <TitleInput placeHolder="John Doe" title="Name" onChange={(e) => setName(e.target.value)} />
          <TitleInput placeHolder="johndoe@email.com" title="Email" onChange={(e) => setEmail(e.target.value)} />
          <TitlePasswordInput
            title="Password"
            placeHolder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TitlePasswordInput
            title="Confirm your password"
            placeHolder="Confirm your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            data-testid={"registerButton"}
            marginTop={4}
            p={8}
            width={"100%"}
            bg={"#FB8500"}
            color={"#023047"}
            borderRadius={50}
            onClick={userRegister}
          >
            Register
          </Button>
          <Link to={"/"}>
            <Text marginTop={4} textAlign={"center"} color={"#ffffff"} fontWeight={"bold"} fontSize={"sm"}>
              Already have an account?
            </Text>
          </Link>
        </Container>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Success!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{data?.message}</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">To login</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </main>
  );
};
