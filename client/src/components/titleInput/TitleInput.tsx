import { Input, Text } from "@chakra-ui/react";
import React from "react";

interface IProps {
  title: string;
}

export const TitleInput: React.FC<IProps> = ({ title }) => {
  return (
    <div>
      <Text fontSize="xl" color={"#ffffff"}>
        {title}
      </Text>
      <Input
        borderRadius={50}
        paddingTop={8}
        paddingBottom={8}
        bg={"#D9D9D9"}
        pr="4.5rem"
        type={"text"}
        placeholder="johndoe@email.com"
      />
    </div>
  );
};
