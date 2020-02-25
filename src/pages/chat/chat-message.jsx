import React from 'react';
import { ListItemText, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cl from 'classnames';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  creator: {
    fontSize: theme.typography.pxToRem(13),
  },
  message: {
    wordWrap: 'break-word',
  },
  withEllipsis: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  secondaryTextWContainer: {
    display: 'flex',
  },
  fromName: {
    flex: 1,
    margin: theme.spacing(0, 1, 0, 0),
  },
}));

const ChatMessage = ({
  message: {
    message,
    from: { name },
    createdAt,
  },
}) => {
  const classes = useStyles();
  const secondaryText = (
    <div className={classes.secondaryTextWContainer}>
      <div className={cl(classes.fromName, classes.withEllipsis)}>{name}</div>
      <div>{moment(createdAt).format('HH:mm:ss MM.DD')}</div>
    </div>
  );
  return (
    <ListItem className={classes.root}>
      <ListItemText
        primary={message}
        primaryTypographyProps={{ className: classes.message, component: 'p' }}
        secondary={secondaryText}
        secondaryTypographyProps={{
          className: classes.creator,
          component: 'div',
        }}
      />
    </ListItem>
  );
};

export default ChatMessage;
