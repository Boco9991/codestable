import React from 'react';
import s from './Input.module.scss';

interface InputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

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
