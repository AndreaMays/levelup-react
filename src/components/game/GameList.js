import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">Title: {game.name_of_game} by {game.maker}</div>
                        <div className="game__players">Number of Players: {game.how_many_players} </div>
                        <div className="game__skillLevel">Skill level is: {game.skill_level}</div>
                    </section>
                })
            }
        </article>
    )
}