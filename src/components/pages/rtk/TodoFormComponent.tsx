import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  createOneTodo,
  TodoForm,
} from '../../../redux/features/todos/todosSlice';
import { useAppDispatch } from '../../../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import JokeGenerator from './JokeGenerator';

interface TodoFormErrors {
  title?: string;
  content?: string;
}

function TodoFormComponent() {
  const dispatch = useAppDispatch();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const initialValues: TodoForm = {
    title: '',
    content: '',
  };

  function handleModalShow() {
    setIsModalShown(true);
  }
  function hanldeModalClose() {
    setIsModalShown(false);
  }

  function handleValidation(values: TodoForm) {
    const { title, content } = values;
    const errors: TodoFormErrors = {};
    if (!title) {
      errors.title = 'Title is required';
    } else if (title.length < 5) errors.title = 'Input at least 5 letters';
    if (!content) {
      errors.content = 'Content is required';
    } else if (content.length < 5) errors.content = 'Input at least 5 letters';
    return errors;
  }

  return (
    <>
      <h3>Add a new todo task</h3>
      <Button variant="success" onClick={handleModalShow}>
        Create
      </Button>
      <JokeGenerator />

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
          <Formik
            initialValues={initialValues}
            validate={handleValidation}
            onSubmit={(values, actions) => {
              const { title, content } = values;
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
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <BootstrapForm
                noValidate
                id="todo-form"
                role="form"
                onSubmit={handleSubmit}
              >
                <BootstrapForm.Group className="mb-3" controlId="todoTitle">
                  <BootstrapForm.Label>Title</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="title"
                    required
                    isInvalid={!!touched.title && !!errors.title}
                    value={values.title}
                    onChange={handleChange}
                    placeholder="enter title"
                  />
                  <div className="invalid-feedback">{errors.title}</div>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="todoContent">
                  <BootstrapForm.Label>Content</BootstrapForm.Label>
                  <BootstrapForm.Control
                    as="textarea"
                    name="content"
                    value={values.content}
                    rows={5}
                    isInvalid={!!touched.content && !!errors.content}
                    maxLength={150}
                    onChange={handleChange}
                    placeholder="enter todo task content"
                  />
                  <div className="invalid-feedback">{errors.content}</div>
                </BootstrapForm.Group>
              </BootstrapForm>
            )}
          </Formik>
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
