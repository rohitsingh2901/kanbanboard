import React, { useState } from "react";
import ToDo from "./States/ToDo";
import Doing from "./States/Doing";
import Done from "./States/Done";

const Home = () => {
  const [updateDoing, setUpdateDoing] = useState(false);
  const [updateToDo, setUpdateToDo] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 border-solid border-2 border-black">
          <ToDo setUpdateDoing={setUpdateDoing} updateToDo={updateToDo} />
        </div>
        <div className="col-4 border-solid border-2 border-black">
          <Doing updateDoing={updateDoing} setUpdateToDo={setUpdateToDo}/>
        </div>
        <div className="col-4 border-solid border-2 border-black">
          <Done />
        </div>
      </div>
    </div>
  );
};

export default Home;
