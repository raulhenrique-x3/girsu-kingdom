import React, { useState } from "react";
import { Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
interface IProps {
  onChange: (e: any) => void;
  placeHolder: string;
  title: string;
}

export const TitlePasswordInput: React.FC<IProps> = ({ onChange, placeHolder, title }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Text fontSize="xl" color={"#ffffff"}>
        {title}
      </Text>
      <InputGroup size="md">
        <Input
          data-testid={"TitlePasswordInput"}
          bg={"#D9D9D9"}
          onChange={onChange}
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder={placeHolder}
          paddingTop={8}
          paddingBottom={8}
          display={"flex"}
          alignItems={"center"}
          borderRadius={50}
        />
        <InputRightElement
          onClick={() => setShow(!show)}
          width="5rem"
          display={"flex"}
          alignItems={"center"}
          padding={8}
        >
          {show ? <AiFillEye /> : <AiFillEyeInvisible />}
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
