import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { EventContext } from "./EventProvider.js"



export const EventList = (props) => {
    const { getEvents, events, joinEvent, leaveEvent } = useContext(EventContext)
    const history = useHistory()

    useEffect(() => {
        getEvents()
    }, [])

    console.log("EVENTS", events)
    const dateTime = new Date().toISOString()

    return (
        <>
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            {
                events
                ?
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">Game Name: {event.game.name_of_game}</div>
                        <div>Game Description: {event.description}</div>
                        <div>
                            {
                                new Date(event.dateTime).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                            @ {new Date(event.dateTime).toTimeString()}
                        </div>
                        event.joined
                                ? 
                                <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id)}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id)}
                                    >Join</button>

                    </section>
                })
                : <div>loading</div>
            }
        </article >

        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            history.push({ pathname: "/events/new" })
        }}
    >Create New Game Event </button>


        </>
    )
}