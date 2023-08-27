import React, { useEffect, useState } from "react";

const Home = () => {
    const [Cards, setCards] = useState([]);
    useEffect(() => {
        fetchCards();
      }, []);

      const fetchCards = async () => {
        try {
          const response = await fetch('http://localhost:5000/cards');
          const data = await response.json();
          setCards(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      const deleteCard = async(index)=>{
        try {
            const response = await fetch(`http://localhost:5000/cards/${Cards[index]._id}`, {
              method: 'DELETE',
            });
            const data = await response.json();
            fetchCards(); 
          } catch (error) {
            console.error('Error:', error);
          }
      }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 border-solid border-2 border-black">
          <h1 className="text-center font-extrabold">To Do</h1>
          {Cards.map((c,i)=>(
            <div key={i} className="flex justify-center">
            <div
              className="card text-black mb-3"
              style={{ maxWidth: "22rem", minWidth: "22rem",background:"#F08080" }}
            >
              <div className="card-header font-bold text-center">{c.title}</div>
              <div className="card-body">
                <p className="card-text">
                  {c.description}
                </p>
                <div className="flex justify-end">
                    <i onClick={()=>deleteCard(i)} className="fa-solid fa-trash mx-2 cursor-pointer"></i>
                    <i className="fa-solid fa-pen-to-square mx-2 cursor-pointer"></i>
                    <i className="fa fa-arrow-right cursor-pointer"></i>
                </div>
              </div>
            </div>
          </div>
          ))}
          
          
        </div>
        <div className="col-4 border-solid border-2 border-black">
          <h1 className="text-center font-extrabold">Doing</h1>
        </div>
        <div className="col-4 border-solid border-2 border-black">
          <h1 className="text-center font-extrabold">Done</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
