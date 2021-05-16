import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    console.log("GameList-GAMES", games)

    return (
        <>
        <article className="games">
            {
                games
                ?
                games.map(game => {
                    return <section key={game.id} className="game">
                        <div className="game__title">Title: {game.name_of_game} by {game.maker}</div>
                        <div className="game__players">Number of Players: {game.how_many_players} </div>
                        <div className="game__skillLevel">Skill level is: {game.skill_level}</div>
                        <button onClick={() => history.push(`/games/${game.id}/update`)}>Edit Game</button>
                    </section>
                })
                : <div>loading</div>
            }
            
        </article>

    <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            history.push({ pathname: "/games/new" })
        }}
    >Register New Game</button>
        
        </>
    )
}