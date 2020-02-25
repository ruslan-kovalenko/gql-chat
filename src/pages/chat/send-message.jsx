import React from 'react';
import { Form, Field } from 'react-final-form';
import { FormLine, FormField, FormSubmitBtn } from '../../components/form';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';
import { SEND_MESSAGE } from '../../api/mutations';
import { withSnackBar } from '../../contexts/snack-bar';
import { ApiError } from '../../models';

const initialValues = {
  message: '',
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 0, 2.5),
  },
  messageLine: {
    alignItems: 'flex-end',
  },
  messageField: {
    margin: 0,
  },
  submitBtn: {
    margin: theme.spacing(0, 0, 0, 2),
  },
}));

const SendMessage = ({ chatId, snackBar }) => {
  const [sendMessage] = useMutation(SEND_MESSAGE, { onError: (err) => {
    snackBar.error({ message: ApiError.from(err).message })
  }});
  const classes = useStyles();
  const onSubmit = ({ message }, { reset }) => {
    if (!message) return;

    sendMessage({
      variables: {
        data: { message, chatId },
      },
    });
    setTimeout(reset);
  };

  return (
    <Form
      {...{
        onSubmit,
        initialValues,
      }}
      render={({ handleSubmit, submitting }) => {
        return (
          <form className={classes.root} onSubmit={handleSubmit} noValidate>
            <FormLine className={classes.messageLine}>
              <Field
                name="message"
                type="text"
                label="Type your message"
                className={classes.messageField}
                fullWidth
                autoComplete="off"
                render={FormField}
              />
              <FormSubmitBtn
                variant="outlined"
                className={classes.submitBtn}
                submitting={submitting}
              >
                Send
              </FormSubmitBtn>
            </FormLine>
          </form>
        );
      }}
    />
  );
};

export default withSnackBar(SendMessage);
