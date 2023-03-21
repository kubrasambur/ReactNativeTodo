import React from "react";
import { Modal, Button, FormControl, Input } from "native-base";

const CustomModalAddEditTodo = ({
  isOpen,
  setOpen,
  headerText,
  firstValue,
  firstOnChangeText,
  Description,
  secondValue,
  secondOnChangeText,
  handleOnPress,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={setOpen}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>{headerText}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{title}</FormControl.Label>
            <Input value={firstValue} onChangeText={firstOnChangeText} />
          </FormControl>
          <FormControl>
            <FormControl.Label>{Description}</FormControl.Label>
            <Input value={secondValue} onChangeText={secondOnChangeText} />
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

export default CustomModalAddEditTodo;
