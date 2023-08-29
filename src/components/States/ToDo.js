import React, { useEffect, useState } from 'react'

const ToDo = ({setUpdateDoing, updateToDo }) => {
  const [Cards, setCards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [utitle, setuTitle] = useState("");
  const [udescription, setuDescription] = useState("");
  const [i, seti] = useState(null);


  useEffect   (() => {
    fetchCards();
  }, [updateToDo]);

  const fetchCards = async () => {
    try {
      const response = await fetch("http://localhost:5000/todo-cards");
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  
  const deleteCard = async (index) => {
    console.log(index)
    try {
      const response = await fetch(
        `http://localhost:5000/todo-cards/${Cards[index]._id}`,
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
        `http://localhost:5000/todocards/edit/${Cards[i]._id}`,
        {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: utitle, description: udescription, column: "todo" }),
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
      const response = await fetch('http://localhost:5000/create-todocard', {
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
      setTitle("")
      setDescription("")
    } catch (error) {
      console.error('Error:', error);
    }
  }
  }

  const moveCardToDoing = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/move-to-doing/${id}`, {
        method: 'PUT',
      });
  
      if (response.status === 200) {
        console.log('Card moved to "Doing" successfully');
        fetchCards()
        setUpdateDoing(prev => !prev);
      } else if (response.status === 404) {
        console.error('Card not found');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
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
                    <i data-toggle="modal"
            data-target="#exampleModalCenter2" onClick={()=>{seti(i) 
            setuTitle(Cards[i].title)
            setuDescription(Cards[i].description)}} className="fa-solid fa-pen-to-square mx-2 cursor-pointer"></i>
                    <i onClick={()=>{moveCardToDoing(c._id)}} className="fa fa-arrow-right cursor-pointer"></i>
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
            id="exampleModalCenter2"
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
                    Update Card
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
                        value={utitle}
                        type="text"
                        className="form-control"
                        onChange={utitleChange}
                        placeholder="This is a titile"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Description</label>
                      <input
                        required
                        value={udescription}
                        type="text"
                        className="form-control"
                        onChange={udescriptionChange}
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
                  <button type="submit" onClick={editCard} {...(utitle && udescription ? { "data-dismiss": "modal" } : {})} className="btn btn-primary">
                    Update Card
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>



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
                        id="title"
                        onChange={titleChange}
                        placeholder="This is a titile"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Description</label>
                      <input
                        required
                        type="text"
                        id="desc"
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
                  <button type="submit" onClick={(event)=>{createCard(event,"todo")}} {...(title && description ? { "data-dismiss": "modal" } : {})} className="btn btn-primary">
                    Add Card
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>
          </>
  )
}

export default ToDo