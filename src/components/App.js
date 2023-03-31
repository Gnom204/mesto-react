import React from 'react'; // импорт библиотеки
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from './ImagePopup.js';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.loadingCard()
      .then((res) => {
        setCards(res)
      })
      .catch(error => console.log(error))
  }, [])
  React.useEffect(() => {
    api.loadingUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
  }, [])

  function handleUpdateUser(name, about) {
    api.refreshProfileData(name, about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null)
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(error => console.log(error));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch(error => console.log(error))
  }

  function handleUpdateAvatar(url) {
    api.changeAvatar(url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCardOnServer(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch(error => console.log(error))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main onCardDelete={handleCardDelete} cards={cards} onCardLike={handleCardLike} onCardClick={handleCardClick} EditAvatarClick={handleEditAvatarClick} AddPlaceClick={handleAddPlaceClick} EditProfileClick={handleEditProfileClick} />
          <Footer />
          <EditProfilePopup onUpdateUser={handleUpdateUser} closeAllPopups={closeAllPopups} isEditProfilePopupOpen={isEditProfilePopupOpen}></EditProfilePopup>
          <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} closeAllPopups={closeAllPopups} ></AddPlacePopup>
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} isClose={closeAllPopups} />
          <PopupWithForm btnText="Да" name="delete" title="Вы уверены?" >

          </PopupWithForm>
          <ImagePopup card={selectedCard} onClose={closeAllPopups}>

          </ImagePopup>
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
