import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useMenu } from '../../components/hooks';
import { useSelector } from 'react-redux';
import { DELETE_CHAT } from '../../api/mutations';
import { useMutation } from '@apollo/react-hooks';
import { Loader } from '../../components/common';
import { ApiError } from '../../models';
import { withSnackBar } from '../../contexts/snack-bar';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  deleteChatBtn: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const ChatMenu = ({ chat, snackBar, iconButtonProps = {} }) => {
  const {
    id,
    creator: { id: creatorId },
  } = chat;
  const classes = useStyles();
  const [isChatDeleteOpen, setIsChatDeleteOpen] = useState(false);
  const [deleteChat, { loading }] = useMutation(DELETE_CHAT, {
    onCompleted: ({ deleteChat }) => {
      if (deleteChat) {
        snackBar.success({ message: 'Chat has been deleted successfully' });
        return;
      }
      snackBar.error({ message: 'Unable to delete chat' });
    },
    onError: err => {
      snackBar.error({ message: ApiError.from(err).message });
    },
  });
  const userId = useSelector(s => s.auth.user.id);
  const { isMenuOpened, onMenuClose, onMenuOpen, menuAnchor } = useMenu();
  const isCurrentUserChatCreator = userId === creatorId;
  const onChatDeleteDialogOpen = () => {
    setIsChatDeleteOpen(true);
    onMenuClose();
  };
  const onDeleteChatClick = () => {
    deleteChat({ variables: { chatId: id } });
  };

  return (
    <>
      {isCurrentUserChatCreator && (
        <>
          <IconButton {...iconButtonProps} onClick={onMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorEl={menuAnchor}
            open={isMenuOpened}
            onClose={onMenuClose}
          >
            <MenuItem onClick={onChatDeleteDialogOpen}>Delete chat</MenuItem>
          </Menu>
          <Dialog
            open={isChatDeleteOpen}
            onClose={() => setIsChatDeleteOpen(false)}
            maxWidth={'xs'}
            fullWidth
            disableBackdropClick={loading}
            disableEscapeKeyDown={loading}
          >
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this chat?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => setIsChatDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className={classes.deleteChatBtn}
                variant="contained"
                onClick={onDeleteChatClick}
              >
                Delete
              </Button>
            </DialogActions>
            {loading && <Loader dim absolute />}
          </Dialog>
        </>
      )}
    </>
  );
};

export default withSnackBar(ChatMenu);
