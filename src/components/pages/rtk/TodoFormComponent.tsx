import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { createOneTodo, TodoForm } from '../../../features/todos/todosSlice';
import { useAppDispatch } from '../../../app/hooks';
import { v4 as uuidv4 } from 'uuid';

function TodoFormComponent() {
  const dispatch = useAppDispatch();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [validated, setValidated] = useState(false);
  const [todoForm, setTodoForm] = useState<TodoForm>({
    title: '',
    content: '',
  });
  function handleModalShow() {
    setIsModalShown(true);
  }
  function hanldeModalClose() {
    setIsModalShown(false);
  }
  function handleSubmitTodo(event: FormEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLInputElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    const { title, content } = todoForm;
    // dispatch createOneTodo action
    dispatch(
      createOneTodo({
        id: uuidv4(),
        title,
        content,
        createAt: new Date().getTime(),
      })
    );
    hanldeModalClose();
    // inital state after submited
    setTodoForm({ title: '', content: '' });
    setValidated(false);
  }
  return (
    <>
      <h3>Add a new todo task</h3>
      <Button variant="success" onClick={handleModalShow}>
        create
      </Button>
      <Modal
        show={isModalShown}
        onHide={hanldeModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a new todo task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="todo-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmitTodo}
          >
            <Form.Group className="mb-3" controlId="todoTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={todoForm.title}
                onChange={(val) => {
                  setTodoForm({ ...todoForm, title: val.target.value });
                }}
                placeholder="enter title"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="todoContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                required
                value={todoForm.content}
                rows={5}
                onChange={(val) => {
                  setTodoForm({ ...todoForm, content: val.target.value });
                }}
                placeholder="enter todo task content"
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={hanldeModalClose}>
            Cancel
          </Button>
          <Button variant="primary" form="todo-form" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoFormComponent;
