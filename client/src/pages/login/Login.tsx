import React, { useState } from "react";
import { Button, Container, Text, useToast } from "@chakra-ui/react";
import { TitleInput } from "../../components/titleInput/TitleInput";
import { TitlePasswordInput } from "../../components/titlePasswordInput/TitlePasswordInput";
import LOGO from "../../assets/LOGO.svg";
import styles from "./login.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const userLogin = async () => {
    await axios
      .post("http://localhost:5000/login", { userEmail: email, userPassword: password })
      .then((res) => {
        toast({
          title: "Logged",
          description: "Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error from LOGIN", error);
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
    <main className={styles.loginMain} data-testid={"LoginPage"}>
      <div className={styles.loginLogoContainer}>
        <img
          className={styles.loginLogoImg}
          src={LOGO}
          alt={"Logo of Girsu's Kingdom. Is an automata girl holding an Scythe"}
        />
      </div>
      <div className={styles.loginContainerDiv}>
        <Container>
          <TitleInput placeHolder="johndoe@email.com" title="Email" onChange={(e) => setEmail(e.target.value)} />
          <TitlePasswordInput
            title="Password"
            placeHolder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            data-testid={"LoginButton"}
            marginTop={4}
            p={8}
            width={"100%"}
            bg={"#FB8500"}
            color={"#023047"}
            borderRadius={50}
            onClick={userLogin}
          >
            Login
          </Button>
          <Link to={"/register"}>
            <Text marginTop={4} textAlign={"center"} color={"#ffffff"} fontWeight={"bold"} fontSize={"sm"}>
              Don't have an account?
            </Text>
          </Link>
        </Container>
      </div>
    </main>
  );
};
