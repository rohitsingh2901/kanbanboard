import React, { useEffect, useState } from "react";


const Home = () => {
  const [Cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
      fetchCards();
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const editCard = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cards/edit/${Cards[index]._id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: title, description: description }),
        }
      );
      const data = await response.json();
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
  const createCard = async(event)=>{
    if(title!=="" && description!==""){
    event.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/create-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      console.log('Card added:', data);
      fetchCards()
    } catch (error) {
      console.error('Error:', error);
    }
  }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 border-solid border-2 border-black">
          <h1 className="text-center font-extrabold">To Do</h1>
          {Cards.map((c, i) => (
            <div key={i} className="flex justify-center">
              <div
                className="card text-black border-danger mb-3"
                style={{ maxWidth: "22rem", minWidth: "22rem" }}
              >
                <div className="card-header font-bold text-center">
                  {c.title}
                </div>
                <div className="card-body">
                  <p className="card-text">{c.description}</p>
                  <div className="flex justify-end">
                    <i
                      onClick={() => deleteCard(i)}
                      className="fa-solid fa-trash mx-2 cursor-pointer"
                    ></i>
                    <i className="fa-solid fa-pen-to-square mx-2 cursor-pointer"></i>
                    <i className="fa fa-arrow-right cursor-pointer"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <h6
            data-toggle="modal"
            data-target="#exampleModalCenter"
            className="cursor-pointer"
          >
            Create Card <i className="fa-solid fa-plus"></i>
          </h6>

          <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
            <form>
              <div className="modal-content" style={{minWidth:"30rem"}}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Add Card in To Do list
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Title</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        onChange={titleChange}
                        placeholder="This is a titile"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Description</label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        onChange={descriptionChange}
                        placeholder="This is a description"
                      />
                    </div>
                  
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    id="cancel"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" onClick={createCard} {...(title && description ? { "data-dismiss": "modal" } : {})} className="btn btn-primary">
                    Add Card
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>

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
