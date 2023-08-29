import React, { useState } from "react";
import ToDo from "./States/ToDo";
import Doing from "./States/Doing";
import Done from "./States/Done";

const Home = () => {
  const [updateDoing, setUpdateDoing] = useState(false);
  const [updateToDo, setUpdateToDo] = useState(false);
  const [updateDone, setUpdateDone] = useState(false);

  return (
    <div className="">
      <div className="flex justify-evenly">
        <div className="col-3 border-solid border-2 border-black">
          <ToDo setUpdateDoing={setUpdateDoing} updateToDo={updateToDo} />
        </div>
        <div className="col-3 border-solid border-2 border-black">
          <Doing updateDoing={updateDoing} setUpdateDone={setUpdateDone} setUpdateToDo={setUpdateToDo}/>
        </div>
        <div className="col-3 border-solid border-2 border-black">
          <Done updateDone={updateDone} setUpdateDoing={setUpdateDoing} />
        </div>
      </div>
    </div>
  );
};

export default Home;
