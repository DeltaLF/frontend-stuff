import { render, screen, waitFor } from '../../../../utils/test-utils';
import RTKpage from '../RTKpage';
import React from 'react';
import userEvent from '@testing-library/user-event';

describe('test create todo form component', () => {
  it('tests modal behavior', async () => {
    render(<RTKpage />, {});
    const user = userEvent.setup();
    // no modal is shown
    const modalHeaderInit = screen.queryByText(/Create a todo task/i);
    expect(modalHeaderInit).not.toBeInTheDocument();
    // click on create task
    const openModalButton = screen.getByRole('button', { name: /create/i });
    await user.click(openModalButton);
    // a modal shown
    const modalHeader = screen.queryByText(/Create a todo task/i);
    expect(modalHeader).toBeInTheDocument();
    // close button works
    const closeModalButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeModalButton);
    await waitFor(() => {
      const modalHeaderClosed = screen.queryByText(/Create a todo task/i);
      expect(modalHeaderClosed).not.toBeInTheDocument();
    });

    // cancel button also works
    await user.click(openModalButton);
    const cancelModalButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelModalButton).toBeInTheDocument();

    await user.click(cancelModalButton);
    await waitFor(() => {
      const modalHeaderCanceled = screen.queryByText(/Create a todo task/i);
      expect(modalHeaderCanceled).not.toBeInTheDocument();
    });
  });

  it('tests submit form functionality', async () => {
    // able to submit form
    render(<RTKpage />, {});
    const user = userEvent.setup();

    // open modal
    const openModalButton = screen.getByRole('button', { name: /create/i });
    await user.click(openModalButton);
    // type title
    const titleInput = await screen.findByLabelText('Title');
    await user.type(titleInput, 'a new todo title');
    // title content
    const contentInput = await screen.findByLabelText('Content');
    await user.type(contentInput, 'a new todo content');
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);
    await waitFor(() => {
      // the modal disappers after successfully send
      const modalHeaderCanceled = screen.queryByText(/Create a todo task/i);
      expect(modalHeaderCanceled).not.toBeInTheDocument();
      // the redux logic is tested in todoSlice.test
    });
  });

  it('tests validation of form', async () => {
    const { container } = render(<RTKpage />, {});
    const user = userEvent.setup();
    // open modal
    const openModalButton = screen.getByRole('button', { name: /create/i });
    await user.click(openModalButton);
    // befoe submit was-validated should not exist
    await waitFor(() => {
      const isRequiredText = screen.queryByText(/is required/i);
      expect(isRequiredText).not.toBeInTheDocument();
    });

    // unable to submit if two input are empty
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);
    // validation strings is shown
    await waitFor(() => {
      const isRequiredText = screen.queryAllByText(/is required/i);
      expect(isRequiredText).toHaveLength(2);
    });
    // one of input is empty
    const titleInput = await screen.findByLabelText('Title');
    await user.type(titleInput, 'a');
    await waitFor(() => {
      const isRequiredText = screen.queryAllByText(/is required/i);
      expect(isRequiredText).toHaveLength(1);
      const atLeast5Chars = screen.queryAllByText(/Input at least 5/i);
      expect(atLeast5Chars).toHaveLength(1);
    });
    await user.type(titleInput, ' new todo title');
    await waitFor(() => {
      const isRequiredText = screen.queryAllByText(/is required/i);
      expect(isRequiredText).toHaveLength(1);
      const atLeast5Chars = screen.queryAllByText(/Input at least 5/i);
      expect(atLeast5Chars).toHaveLength(0);
    });
    const ContentInput = await screen.findByLabelText('Content');
    await user.type(ContentInput, 'a');
    await waitFor(() => {
      const isRequiredText = screen.queryAllByText(/is required/i);
      expect(isRequiredText).toHaveLength(0);
      const atLeast5Chars = screen.queryAllByText(/Input at least 5/i);
      expect(atLeast5Chars).toHaveLength(1);
    });

    await user.type(ContentInput, ' new todo content');
    await waitFor(() => {
      const isRequiredText = screen.queryAllByText(/is required/i);
      expect(isRequiredText).toHaveLength(0);
      const atLeast5Chars = screen.queryAllByText(/Input at least 5/i);
      expect(atLeast5Chars).toHaveLength(0);
    });
  });
});

describe('test edit todo form component and delete', () => {
  it('tests todo can be edited', async () => {
    render(<RTKpage />, {});
    const title = 'Brand new todo';
    const content = 'todo content';
    const newTitle = 'new ' + title;
    const newContent = 'new ' + content;
    const user = userEvent.setup();
    const newTodoTitle = screen.queryByText(title);
    expect(newTodoTitle).not.toBeInTheDocument();
    // create a todo
    const openModalButton = screen.getByRole('button', { name: /create/i });
    await user.click(openModalButton);
    const titleInput = await screen.findByLabelText('Title');
    await user.type(titleInput, title);
    const contentInput = await screen.findByLabelText('Content');
    await user.type(contentInput, content);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    // no edit modal is shown
    await waitFor(() => {
      const modalHeaderInit = screen.queryByText(/Create a todo task/i);
      expect(modalHeaderInit).not.toBeInTheDocument();
      const editModalHeaderInit = screen.queryByText(/Edit a todo task/i);
      expect(editModalHeaderInit).not.toBeInTheDocument();
    });
    const editButton = screen.getByLabelText('edit-todo');
    await user.click(editButton.firstChild as Element);
    const newtitleInput = await screen.findByLabelText('Title');
    await user.clear(newtitleInput);
    await user.type(newtitleInput, newTitle);
    const newContentInput = await screen.findByLabelText('Content');
    await user.clear(newContentInput);
    await user.type(newContentInput, newContent);
    const submitEditButton = await screen.getByRole('button', {
      name: 'Submit',
    });
    await user.click(submitEditButton);
    await waitFor(() => {
      const newTitleElement = screen.getByRole('heading', { name: newTitle });
      expect(newTitleElement).toBeInTheDocument();
      const newContentEleemnt = screen.getByText(newContent);
      expect(newContentEleemnt).toBeInTheDocument();
    });
  });

  it('tests todo can be edited', async () => {
    render(<RTKpage />, {});
    const title = 'Brand new todo';
    const content = 'todo content';
    const user = userEvent.setup();
    const newTodoTitle = screen.queryByText(title);
    expect(newTodoTitle).not.toBeInTheDocument();
    // create a todo
    const openModalButton = screen.getByRole('button', { name: /create/i });
    await user.click(openModalButton);
    const titleInput = await screen.findByLabelText('Title');
    await user.type(titleInput, title);
    const contentInput = await screen.findByLabelText('Content');
    await user.type(contentInput, content);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await user.click(submitButton);

    // new todo is created
    await waitFor(() => {
      const modalHeaderInit = screen.queryByText(title);
      expect(modalHeaderInit).toBeInTheDocument();
      const editModalHeaderInit = screen.queryByText(content);
      expect(editModalHeaderInit).toBeInTheDocument();
    });
    const deleteButton = screen.getByLabelText('Delete');
    await user.click(deleteButton);
    // to-do is gone
    await waitFor(() => {
      const modalHeaderInit = screen.queryByText(title);
      expect(modalHeaderInit).not.toBeInTheDocument();
      const editModalHeaderInit = screen.queryByText(content);
      expect(editModalHeaderInit).not.toBeInTheDocument();
    });
  });
});
