import { useState } from "react";

export const useForm = <T extends object>(form: T) => {
  const [state, setState] = useState(form);

  const onChange = (val: string, field: keyof T) => {
    setState({
      ...state,
      [field]: val,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};
