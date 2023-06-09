// REACT
import React from "react";
// STYLE
import { Modal, Button, FormControl, Input } from "native-base";

const CustomModalAddEditTodoList = ({
  isOpen,
  setOpen,
  headerText,
  value,
  onChangeText,
  handleOnPress,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={setOpen} safeAreaTop={true}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>{headerText}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <Input value={value} onChangeText={onChangeText} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={setOpen}>
              Cancel
            </Button>
            <Button onPress={handleOnPress}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default CustomModalAddEditTodoList;
