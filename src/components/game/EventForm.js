import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"


export const EventForm = () => {
    const history = useHistory()

	const {events, getEvents, createEvent} = useContext(EventContext)
	const {games, getGames} = useContext(GameContext)

    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        getGames();
    }, [])

    const changeEventState = (domEvent) => {
        const newEvent = Object.assign({}, currentEvent)
		newEvent[domEvent.target.name] = domEvent.target.value
		setEvent(newEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
			<fieldset>
				<label htmlFor="location">Location: </label>
				<input type="text" name="location" onChange={changeEventState}/>
			</fieldset>
			<fieldset>
				<label htmlFor="time">Event time: </label>
				<input type="date" name="time" onChange={changeEventState}/>
			</fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
					createEvent({
						time: currentEvent.time,
						location: currentEvent.location,
						gameId: parseInt(currentEvent.gameId)
					}).then(() => history.push("/events"))

                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}