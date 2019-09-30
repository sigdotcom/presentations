import React, {useState} from "react";

const Timer: React.SFC = () =>{
  const [date, setDate]:[Date, any] =useState<Date>(new Date());


  return(
    <div>
      <div>{date.toLocaleString()}</div>
      <button onClick={(e) => setDate(new Date())}>Update Time</button>
  </div>
  )
}

export { Timer }
