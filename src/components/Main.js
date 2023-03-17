import api from "../utils/Api"
import React from "react"
import Card from "./Card"
function Main(props) {
    const [userName, setUserName] = React.useState()
    const [userAvatar, setUserAvatar] = React.useState()
    const [userDescription, setUserDescription] = React.useState()
    const [cards, setCards] = React.useState([])
    React.useEffect(() => {
        api.loadingUserInfo()
            .then((res) => {
                setUserName(res.name);
                setUserAvatar(res.avatar);
                setUserDescription(res.about)
            })
        api.loadingCard()
            .then((res) => {
                setCards(res)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-bg" onClick={props.EditAvatarClick}>
                    <img src={`${userAvatar}`} alt="" className="profile__avatar" />
                </div>
                <div className="profile__intro">
                    <div className="profile__container">
                        <h1 className="profile__title">{userName}</h1>
                        <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={props.EditProfileClick}></button>
                    </div>
                    <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-button" onClick={props.AddPlaceClick}></button>
            </section>
            <div className="elements">
                <ul className="elements__container">
                    {cards.map((cardConfig, i) => (
                        <Card card={cardConfig} key={cardConfig._id} onCardClick={props.onCardClick} >

                        </Card>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default Main