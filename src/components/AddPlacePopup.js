import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const nameRef = useRef('');
    const linkRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddCard(nameRef.current.value, linkRef.current.value)
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} btnText="Создать" name="AddCard" title="Новое место" isClose={props.closeAllPopups} isOpen={props.isOpen}>
            <input ref={nameRef} required minLength="2" maxLength="30" type="text" placeholder="Название" id="popupAddCardTitle"
                name="name" className="popup__form popup__form_type_name" />
            <span className="popup__error" id="popupAddCardTitle-error"></span>
            <input ref={linkRef} required type="url" placeholder="Ссылка на картинку" id="popupAddCardLink" name="link"
                className="popup__form popup__form_type_description" />
            <span className="popup__error" id="popupAddCardLink-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup