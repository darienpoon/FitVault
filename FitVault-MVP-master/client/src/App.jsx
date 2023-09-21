import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllCloset from './components/AllCloset.jsx';
import SearchClosetPieces from './components/SearchClosetPieces.jsx';
import Search from './components/Search.jsx';
import ClosetCarousel from './components/ClosetCarousel.jsx';
import Modal from './components/Modal.jsx';
import ChatGPT from './components/ChatGPT.jsx';
import logo from './assets/logo.png';

function App() {
  const [loading, setLoading] = useState(true); // State to manage the loading state
  const [closetData, setClosetData] = useState([]);
  const [searchedClosetData, setSearchedClosetData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [showAllCloset, setShowAllCloset] = useState(false);
  const [showSearchCloset, setShowSearchCloset] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState(null);


  const handleShowAllCloset = () => {
    // If there is an active search, toggle the SearchClosetPieces component
    if (searchedClosetData.length > 0) {
      setShowSearchCloset(!showSearchCloset);
    } else {
      // If no active search, toggle the AllCloset component
      setShowAllCloset(!showAllCloset);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    loadCloset()
  };

  const loadCloset = (param) => {
    const url = param ? `http://localhost:3001/search/${param}` : 'http://localhost:3001/';
    return axios
      .get(url)
      .then(function (response) {
        if (!param) {
          setClosetData(response.data.rows);
          console.log(response.data.rows);
          return response.data.rows;
        } else {
          setSearchedClosetData(response.data);
          return response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setLoading(false);
    }, 3800); // Set the loading state to false after 1 second
    loadCloset();
  }, []);

  useEffect(() => {
    loadCloset();
  }, [deleteStatus, editItemId]);

  const handleSubmitButtonClick = (formData, id) => {
    console.log(id)
    formData.preventDefault();
    const form = formData.target
    const formDatas = new FormData(form)

    // Get the file input element(s)
    const fileInputs = form.querySelectorAll('input[type="file"]');
    const addedFileNames = new Set();
    // Loop through each file input and append the files to the FormData
    fileInputs.forEach((fileInput) => {
      const fieldName = fileInput.name;
      const files = fileInput.files;
      for (let i = 0; i < ((files.length)); i++) {
        const file = files[i];
        if (!addedFileNames.has(file.name)) { // Check if the file is not already added
          formDatas.append(fieldName, file);
          addedFileNames.add(file.name); // Add the file name to the Set
      }
    }
    });

    const formJson = Object.fromEntries(formDatas.entries())
    console.log(formJson)

    const isItemDuplicate = closetData.some((item) => {
      return (
        item.item === formJson.item &&
        item.category === formJson.category &&
        item.color === formJson.color &&
        item.brand === formJson.brand &&
        item.occasion === formJson.occasion &&
        item.tags === formJson.tags &&
        item.photos === formJson.photos
      );
    });

    if (isItemDuplicate) {
      window.alert('Item already exists in the closet.');
      return;
    }

    if(!id) {
    axios.post('http://localhost:3001/', formDatas, {
      headers: {
        'Content-Type': 'multipart/form-data', //  Set the content type for file uploads
      },
    })
    .then(function () {
      form.reset();
      loadCloset();
      closeModal();
    })
    .catch(function (error) {
      console.log(error);
    })
    } else {
    console.log(id)
    console.log('PUT REQUESTED')
    axios.put(`http://localhost:3001/edit/${id}`, formDatas, {
      headers: {
        'Content-Type': 'multipart/form-data', //  Set the content type for file uploads
      },
    })
    .then(function () {
      console.log(searchedTerm, 'searchedTERM')
      searchedTerm ? loadCloset(searchedTerm) : loadCloset();
      closeModal();
    })
    .catch(function (error) {
      console.log(error);
    })
    }

  }

  const handleSearchButtonClick = (searched) => {
    if(searched.length === 0) {
      window.alert('please enter valid search');
      return;
    }
    loadCloset(searched)
    .then((response) => {
      // console.log(response,'checking')
      setSearchedTerm(searched)
      setSearchedClosetData(response)
      setShowSearchCloset(true)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  console.log(searchedClosetData)


  const handleEditButton = (id) => {
    console.log(id)
    setEditItemId(id)
    setIsModalOpen(true)
  }

  const handleDeleteButton = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (!isConfirmed) {
      return;
    }

    try {
      console.log(`About to delete item with ID ${id}`);
      await axios.delete(`http://localhost:3001/delete/${id}`);
      console.log(`Deleted item with ID ${id}`);
      // Set the deleteStatus state to true after successful deletion
      await setDeleteStatus(true);
      await (searchedTerm ? loadCloset(searchedTerm) : loadCloset())
    } catch (error) {
      console.error("Error while deleting:", error);
    }
  };

  const handleHomeClick = () => {
    // Reload the page to initiate loadCloset and fetch the latest data
    window.location.reload();
  };

  return (
    <>
    {/* Splash screen with centered "VAULT" text */}
    {loading && ( <div className = "splash-container">
      {/* <a href="http://localhost:3000/" target="_blank">
      <img src={logo} className="logo react" alt="Main logo" />
    </a> */}
      <div className="splash">
        <h1>FITVAULT</h1>
      </div>
    </div>)}

    {/* Main content */}
    {!loading && (
      <>
        {/* <div>
          <a href="http://localhost:3000/" target="_blank">
            <img src={logo} className="logo react" alt="Main logo" />
          </a>
        </div> */}
        <div className="page-content-wrapper">
          <div className="home">
        <h1 >
          <span className = "homeLogo" onClick={handleHomeClick}>FITVAULT</span>
        </h1>
        <hr></hr>
        </div>
        <div>
          <button className="button" onClick={openModal}>
            ADD ITEM
          </button>
          {searchedClosetData ? (
            <>
              <Search
                className="button"
                handleSearchButtonClick={handleSearchButtonClick}
              />
              <br />
            </>
          ) : (
            <div>
              <Search handleSearchButtonClick={handleSearchButtonClick} />
              <br />
              <h3> No related results found in closet...</h3> <hr></hr>
            </div>
          )}
          <ChatGPT closetData = {closetData} />
        </div>
        <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmitButtonClick={handleSubmitButtonClick}
        id={editItemId}
      />
        <ClosetCarousel
          closetData={closetData}
          searchedClosetData={searchedClosetData}
        />
        <br></br> <hr></hr>
          {/* Add the button to show/hide the AllCloset/SearchClosetPieces components */}
            <div className="vault-display" >
              <div >
            <button className="button" onClick={handleShowAllCloset}>
              {searchedClosetData.length === 0
                ? showAllCloset
                  ? 'Hide My Vault'
                  : 'Show My Vault'
                : showSearchCloset
                ? 'Hide Search Results'
                : 'Show Search Results'}
            </button>
          </div>
        {/* Show/Hide the SearchClosetPieces component based on state */}
        {showSearchCloset && (
          <SearchClosetPieces
            searchedClosetData={searchedClosetData}
            handleEditButton={handleEditButton}
            handleDeleteButton={handleDeleteButton}
          />
        )}

        {/* Show/Hide the AllCloset component based on state */}
        {searchedClosetData.length === 0 && showAllCloset && (
          <AllCloset
            closetData={closetData}
            handleEditButton={handleEditButton}
            handleDeleteButton={handleDeleteButton}
          />
        )}

        <br></br> <hr></hr>
        </div>
        </div>
      </>
    )}

    </>
  );
}

export default App;