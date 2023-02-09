import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import BootstrapForm from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  createOneTodo,
  updateOneTodo,
  TodoForm,
  TodoState,
} from '../../../redux/features/todos/todosSlice';
import JokeQLGenerator from './JokeQLGenerator';
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
import { ActionCreatorWithPayload } from '@reduxjs/toolkit/dist/createAction';

interface TodoFormErrors {
  title?: string;
  content?: string;
}

interface TodoFormComponentProps {
  isModalShown: boolean;
  setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'Create' | 'Edit';
  initalValue?: TodoState;
  renderButton: (callback: () => void) => JSX.Element;
}

function TodoFormComponent({
  isModalShown,
  setIsModalShown,
  type,
  initalValue,
  renderButton,
}: TodoFormComponentProps) {
  const dispatch = useAppDispatch();
  const initialValues: TodoForm = {
    title: initalValue ? initalValue.title : '',
    content: initalValue ? initalValue.content : '',
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
      {renderButton(handleModalShow)}
      <Modal
        show={isModalShown}
        onHide={hanldeModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{type} a todo task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validate={handleValidation}
            onSubmit={(values, actions) => {
              const { title, content } = values;
              // dispatch createOneTodo action
              // check now is editing or creating
              // dispatch(todoAction())
              if (type === 'Create') {
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
              } else {
                dispatch(
                  updateOneTodo({
                    id: initalValue!.id,
                    title,
                    content,
                  })
                );
              }
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
