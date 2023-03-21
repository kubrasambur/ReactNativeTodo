// REACT
import React from "react";
// STYLE
import { Modal, Button, Text } from "native-base";

const CustomModalDelete = ({
  isOpen,
  setOpen,

  handleOnPress,
  text,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={setOpen} safeAreaTop={true}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Body>
          <Text fontSize="18" fontWeight="bold" mr={6} alignSelf="center">
            {text}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={setOpen}>
              Cancel
            </Button>
            <Button onPress={handleOnPress}>Delete</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModalDelete;
