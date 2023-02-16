import { Button, Container, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { TitleInput } from "../../components/titleInput/TitleInput";
import { TitlePasswordInput } from "../../components/titlePasswordInput/TitlePasswordInput";
import LOGO from "../../assets/LOGO.svg";
import styles from "./login.module.scss";

export const Login = () => {
  const [password, setPassword] = useState<string>();
  console.log(password);
  return (
    <main className={styles.loginMain}>
      <div className={styles.loginLogoContainer}>
        <img
          className={styles.loginLogoImg}
          src={LOGO}
          alt={"Logo of Girsu's Kingdom. Is an automata girl holding an Scythe"}
        />
      </div>
      <div className={styles.loginContainerDiv}>
        <Container>
          <TitleInput title="Email" />
          <TitlePasswordInput onChange={(e) => setPassword(e.target.value)} />
          <Button marginTop={4} p={8} width={"100%"} bg={"#FB8500"} color={"#023047"} borderRadius={50}>
            Login
          </Button>
          <Text marginTop={4} textAlign={"center"} color={"#ffffff"} fontWeight={"bold"} fontSize={"sm"}>
            Don't have an account?
          </Text>
        </Container>
      </div>
    </main>
  );
};
