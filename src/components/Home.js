import React from "react";
import ToDo from "./States/ToDo";
import Doing from "./States/Doing";
import Done from "./States/Done";


const Home = () => {
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 border-solid border-2 border-black">
          <ToDo/>
        </div>
        <div className="col-4 border-solid border-2 border-black">
          <Doing/>
        </div>
        <div className="col-4 border-solid border-2 border-black">
          <Done/>
        </div>
      </div>
    </div>
  );
};

export default Home;
