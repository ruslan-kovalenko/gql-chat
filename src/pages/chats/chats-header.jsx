import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CHAT } from '../../api/mutations';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Container,
  Button,
  makeStyles,
} from '@material-ui/core';
import { FormLine } from '../../components/form';
import { Loader } from '../../components/common';
import { withSnackBar } from '../../contexts/snack-bar';
import { ApiError } from '../../models';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useSelector } from 'react-redux';
import { useActions } from '../../components/hooks';
import { userDataActions, chatListTypes } from '../../store/user-data';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0, 1.4, 0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialog: {
    padding: theme.spacing(1, 0),
    position: 'relative',
  },
  createChatBtn: {
    marginLeft: theme.spacing(1),
    minWidth: '85px',
  },
}));

const actions = {
  setChatListType: userDataActions.setChatListType,
};

const ChatsHeader = ({ snackBar }) => {
  const classes = useStyles();
  const [createChat, { loading }] = useMutation(CREATE_CHAT);
  const [isCreateChatOpen, setIsCreateChatOpen] = useState(false);
  const [chatCreateName, setChatCreateName] = useState('');
  const chatListType = useSelector(state => state.userData.chatListType);
  const { setChatListType } = useActions(actions);
  const onChatListTypeChange = useCallback(
    (_, chatListType) => {
      if (!chatListType) return;
      setChatListType({ chatListType });
    },
    [setChatListType]
  );
  const onChatCreate = async () => {
    if (!chatCreateName.length) {
      return snackBar.error({
        message: 'Chat name should be longer than one symbol',
      });
    }

    try {
      await createChat({
        variables: { chatSettings: { name: chatCreateName } },
      });
      setChatCreateName('');
      setIsCreateChatOpen(false);
      snackBar.success({ message: 'Chat has been created successfully' });
    } catch (err) {
      snackBar.error({
        message: ApiError.from(err).message,
      });
    }
  };

  return (
    <Container className={classes.root}>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setIsCreateChatOpen(true)}
      >
        Create a chat
      </Button>
      <ToggleButtonGroup value={chatListType} exclusive onChange={onChatListTypeChange}>
        <ToggleButton value={chatListTypes.grid}>
          <AppsIcon />
        </ToggleButton>
        <ToggleButton value={chatListTypes.list}>
          <ListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Dialog
        classes={{ paper: classes.dialog }}
        open={isCreateChatOpen}
        onClose={() => setIsCreateChatOpen(false)}
        maxWidth={'xs'}
        fullWidth
        disableBackdropClick={loading}
        disableEscapeKeyDown={loading}
      >
        <DialogTitle>Create a new chat</DialogTitle>
        <DialogContent>
          <FormLine>
            <TextField
              type="text"
              label="Chat name"
              autoFocus
              onChange={({ target: { value } }) => setChatCreateName(value)}
              fullWidth
              minLength="1"
            />
            <Button
              className={classes.createChatBtn}
              color="primary"
              variant="outlined"
              onClick={onChatCreate}
            >
              Create
            </Button>
          </FormLine>
          {loading && <Loader absolute dim />}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default withSnackBar(ChatsHeader);
