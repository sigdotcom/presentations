import React from "react";

const Timer: React.SFC = () =>{
  return(
    <div>{new Date().toLocaleString()}</div>
  )
}

export { Timer }
