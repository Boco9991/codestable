import React from 'react';
import { InputProps } from '../../../types/interfaces/InputProps';
import s from './Input.module.scss';

const Input: React.FC<InputProps> = ({ placeholder, onChange, icon }) => {
  return (
    <div className={s.InputWrapper}>
      {icon && <div className={s.Icon}>{icon}</div>}
      <input
        type="text"
        placeholder={placeholder}
        className={s.Input}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
