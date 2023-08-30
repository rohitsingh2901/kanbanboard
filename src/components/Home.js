import React, { useState } from "react";
import ToDo from "./States/ToDo";
import Doing from "./States/Doing";
import Done from "./States/Done";

const Home = () => {
  const [updateDoing, setUpdateDoing] = useState(false);
  const [updateToDo, setUpdateToDo] = useState(false);
  const [updateDone, setUpdateDone] = useState(false);

  return (
    <div id="home" className="my-12">
      <div className="roww">
        <div className="column my-2 border-solid border-2 border-black">
          <ToDo setUpdateDoing={setUpdateDoing} updateToDo={updateToDo} />
        </div>
        <div className="column my-2 border-solid border-2 border-black">
          <Doing updateDoing={updateDoing} setUpdateDone={setUpdateDone} setUpdateToDo={setUpdateToDo}/>
        </div>
        <div className="column my-2 border-solid border-2 border-black">
          <Done updateDone={updateDone} setUpdateDoing={setUpdateDoing} />
        </div>
      </div>
    </div>
  );
};

export default Home;
