import React from "react";

export interface ITodo {
  id: string;
  name: string;
  description?: string;
  onDelete?: () => void;
}

export const Todo: React.SFC<ITodo> = (props:ITodo) => {

  return (
    <li>
      {props.name} - <i>{props.description}</i>
      <button onClick={props.onDelete}> Delete Todo</button>
    </li>
  );
}
