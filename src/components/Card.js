function Card(props) {
    function handleClick() {
        props.onCardClick(props.card)
    }
    return (
        <li className="element" onClick={() => handleClick()}>
            <div className="element__trash-can"></div>
            <img src={props.card.link} alt={props.card.name} className="element__img" />
            <div className="element__group">
                <h2 className="element__heading">{props.card.name}</h2>
                <div className="element__like-group">
                    <button type="button" className="element__like"></button>
                    <span className="element__like-amount">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}
export default Card