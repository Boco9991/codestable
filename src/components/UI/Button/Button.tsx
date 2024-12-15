import React from 'react';
import s from './Button.module.scss';
import { ButtonProps } from '../../../types/interfaces/ButtonProps';

const Button: React.FC<ButtonProps> = ({
  onClick,
  onDoubleClick,
  label,
  className,
  variant,
}) => {
  const buttonClass = `${s.Btn} ${variant === 'add' ? s.BtnAdd : variant === 'remove' ? s.BtnRemove : ''} ${className || ''}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {label}
    </button>
  );
};

export default Button;
