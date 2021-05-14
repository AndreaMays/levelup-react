import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"


export const EventForm = () => {
    const history = useHistory()

    const [currentEvent, setEvent] = useState({})
    const {createEvent} = useContext(EventContext)
    const {getGames, games} = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    console.log("GAMES", games)

    const changeEventState = (domEvent) => {
        domEvent.preventDefault()
        const newCurrentEvent = { ...currentEvent }
        newCurrentEvent[domEvent.target.id] = domEvent.target.value
        setEvent(newCurrentEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control" id="gameId"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key={game.id} value={game.id} >Game Label: {game.name_of_game}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input name="description" type="text" id="description" value={currentEvent.description} onChange={ changeEventState } ></input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input name="dateTime" type="datetime-local" id="dateTime" value={currentEvent.dateTime} onChange={ changeEventState } ></input>
                </div>
            </fieldset>
            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    const event = {...currentEvent}
                    event.gameId = parseInt(event.gameId)
                    
                    // Create the event
                    createEvent(currentEvent)
                        .then(() => history.push('/events'))

                    // Once event is created, redirect user to event list
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}