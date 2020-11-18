import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
const MyButton = ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  disabled,
}) => {
  return (
    <Tooltip title={tip} className={tipClassName}>
      <div>
        <IconButton
          onClick={onClick}
          className={btnClassName}
          disabled={disabled}
        >
          {children}
        </IconButton>
      </div>
    </Tooltip>
  );
};

export default MyButton;
