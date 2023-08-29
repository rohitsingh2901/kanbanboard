import React, { useEffect, useState } from "react";
import ToDo from "./States/ToDo";
import Doing from "./States/Doing";
import Done from "./States/Done";


const Home = () => {
  const [Cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [utitle, setuTitle] = useState("");
  const [udescription, setuDescription] = useState("");
  const [i, seti] = useState(null);




  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:5000/cards");
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  
  const deleteCard = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cards/${Cards[index]._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data)
      fetchCards();
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const editCard = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/cards/edit/${Cards[i]._id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: utitle, description: udescription }),
        }
      );  
      const data = await response.json();
      console.log(data)
      fetchCards();
    } catch (error) {
      console.error("Error:", error);
    }
  };




  const titleChange = (event)=>{
      setTitle(event.target.value);
  }
  const descriptionChange = (event)=>{
      setDescription(event.target.value);
  }
  const utitleChange = (event)=>{
      setuTitle(event.target.value);
  }
  const udescriptionChange = (event)=>{
      setuDescription(event.target.value);
  }
  const createCard = async(event,column)=>{
    if(title!=="" && description!==""){
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/create-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, column}),
      });
      const data = await response.json();
      console.log('Card added:', data);
      fetchCards()
      document.getElementById('title').value=""
      document.getElementById('desc').value=""
    } catch (error) {
      console.error('Error:', error);
    }
  }
  }



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
