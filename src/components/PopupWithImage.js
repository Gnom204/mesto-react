function PopupWithImage(props) {
    return (
        <div className={`popup popup_dark popup-img ${((props.card) ? 'popup_is-open' : '')} `}>
            <div className="popup__picture-container">
                <button type="button" aria-label="Закрыть" id="closeBigImg"
                    className="popup__close popup__close_type_popup-img" onClick={props.onClose}></button>
                <img src={props.card.link} alt={props.card.name} className="popup__picture" />
                <p className="popup__description">{props.card.name}</p>
            </div>
        </div>
    )
}
export default PopupWithImage