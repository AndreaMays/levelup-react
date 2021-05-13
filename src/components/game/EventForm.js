import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"


export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setEvent] = useState([])
    const [createEvent] = useContext(EventContext)
    const [games, setGames] = useContext(GameContext)

    useEffect(() => {
        games()
    }, [])

    const changeEventState = (domEvent) => {
        const newCurrentEvent = { ...currentEvent }
        newCurrentEvent.title = domEvent.target.value
        setEvent(newCurrentEvent)
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
                                <option key={game.id} value={game.id} >Game Label: {game.label}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input name="description" type="text"></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input name="dateTime" type="datetime-local"></input>
                </div>
            </fieldset>
            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    createEvent(currentEvent)
                        .then(res => history.push('/events'))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}