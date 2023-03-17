import React from 'react'; // импорт библиотеки
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from './PopupWithImage.js';

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  const [selectedCard, setselectedCard] = React.useState(false)

  function closeAllPopups() {
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setselectedCard(false)
  }
  function handleCardClick(card) {
    console.log(selectedCard)
    setselectedCard(card);
  }
  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main onCardClick={handleCardClick} EditAvatarClick={handleEditAvatarClick} AddPlaceClick={handleAddPlaceClick} EditProfileClick={handleEditProfileClick} />
        <Footer />
        <PopupWithForm name="profile" title="Редактировать Профиль" isClose={closeAllPopups} isOpen={isEditProfilePopupOpen}>
          <input required type="text" placeholder="Имя" name="userName" minLength="2" maxLength="40"
            id="profile-name" className="popup__form popup__form_type_name" />
          <span className="popup__error" id="profile-name-error"></span>
          <input required type="text" placeholder="Вид деятельности" name="userDescription" id="popup-description"
            minLength="2" maxLength="200" className="popup__form popup__form_type_description" />
          <span className="popup__error" id="popup-description-error"></span>
        </PopupWithForm>
        <PopupWithForm name="AddCard" title="Новое место" isClose={closeAllPopups} isOpen={isAddPlacePopupOpen}>
          <input required minLength="2" maxLength="30" type="text" placeholder="Название" id="popupAddCardTitle"
            name="name" className="popup__form popup__form_type_name" />
          <span className="popup__error" id="popupAddCardTitle-error"></span>
          <input required type="url" placeholder="Ссылка на картинку" id="popupAddCardLink" name="link"
            className="popup__form popup__form_type_description" />
          <span className="popup__error" id="popupAddCardLink-error"></span>
        </PopupWithForm>
        <PopupWithForm name="avatar" title="Обновить аватар" isClose={closeAllPopups} isOpen={isEditAvatarPopupOpen}>
          <input required type="url" id="avatar-input" placeholder="Ссылка на картинку" name="avatar"
            className="popup__form popup__form_type_description" />
          <span className="popup__error" id="avatar-input-error"></span>
        </PopupWithForm>
        <PopupWithForm name="delete" title="Вы уверены?" >

        </PopupWithForm>
        <PopupWithImage card={selectedCard} onClose={closeAllPopups}>

        </PopupWithImage>
      </div>
    </div>
  );
}

export default App;
