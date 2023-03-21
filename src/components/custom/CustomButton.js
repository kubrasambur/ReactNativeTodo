// REACT
import React from "react";
// STYLE
import { Button } from "native-base";

const CustomButton = ({ title, handleOnPress }) => {
  return (
    <Button w="100%" onPress={handleOnPress} _text={{ fontSize: "15" }} mb={5}>
      {title}
    </Button>
  );
};

export default CustomButton;
