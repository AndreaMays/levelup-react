import React, { useState } from "react"

export const GameContext = React.createContext()

export const GameProvider = (props) => {
    const [ games, setGames ] = useState([])
    const [ gameTypes, setGameTypes ] = useState([])

    const getGames = () => {
        return fetch("http://localhost:8000/games", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setGames)
    }

    const createGame = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST", 
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
            .then(setGames)
        }

    const getGameTypes = () => {
        return fetch("http://localhost:8000/gametypes", { 
            headers: {
                "Authorization": `Token ${localStorage.getItem('lu_token')}`
            }
        })
            .then(res => res.json())
            .then(setGameTypes)
    }

    const updateGame = (game) => {
        return fetch(`http://localhost:8000/games/${game.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem('lu_token')}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
        .then(getGames)
    }

   const getGameById = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem('lu_token')}`   
             }
        })
        .then(response => response.json())
        .then(game => {
            return {
                skillLevel: game.skill_level,
                numberOfPlayers: game.how_many_players,
                title: game.name_of_game,
                maker: game.maker,
                gameTypeId: game.type_of_game.id
            }
        })
   
}

    return (
        <GameContext.Provider value={{ games, getGames, getGameTypes, createGame, gameTypes, updateGame, getGameById }} >
            { props.children }
        </GameContext.Provider>
    )
}