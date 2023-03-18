import React from 'react'; // импорт библиотеки
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)

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
    console.log(selectedCard)
    setSelectedCard(card);
  }
  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main onCardClick={handleCardClick} EditAvatarClick={handleEditAvatarClick} AddPlaceClick={handleAddPlaceClick} EditProfileClick={handleEditProfileClick} />
        <Footer />
        <PopupWithForm btnText="Сохранить" name="profile" title="Редактировать Профиль" isClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
          <input required type="text" placeholder="Имя" name="userName" minLength="2" maxLength="40"
            id="profile-name" className="popup__form popup__form_type_name" />
          <span className="popup__error" id="profile-name-error"></span>
          <input required type="text" placeholder="Вид деятельности" name="userDescription" id="popup-description"
            minLength="2" maxLength="200" className="popup__form popup__form_type_description" />
          <span className="popup__error" id="popup-description-error"></span>
        </PopupWithForm>
        <PopupWithForm btnText="Создать" name="AddCard" title="Новое место" isClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
          <input required minLength="2" maxLength="30" type="text" placeholder="Название" id="popupAddCardTitle"
            name="name" className="popup__form popup__form_type_name" />
          <span className="popup__error" id="popupAddCardTitle-error"></span>
          <input required type="url" placeholder="Ссылка на картинку" id="popupAddCardLink" name="link"
            className="popup__form popup__form_type_description" />
          <span className="popup__error" id="popupAddCardLink-error"></span>
        </PopupWithForm>
        <PopupWithForm btnText="Сохранить" name="avatar" title="Обновить аватар" isClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
          <input required type="url" id="avatar-input" placeholder="Ссылка на картинку" name="avatar"
            className="popup__form popup__form_type_description" />
          <span className="popup__error" id="avatar-input-error"></span>
        </PopupWithForm>
        <PopupWithForm btnText="Да" name="delete" title="Вы уверены?" >

        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}>

        </ImagePopup>
      </div>
    </div>
  );
}

export default App;
