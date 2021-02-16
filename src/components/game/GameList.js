import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "./GameProvider.js"

export const GameList = () => {
	const { games, getGames } = useContext(GameContext)

	useEffect(() => {
		getGames()
	}, [])

	const history = useHistory();

	return (
		<>
			<button className="btn btn-2 btn-sep icon-create"
				onClick={() => {
					history.push({ pathname: "/games/new" })
				}}
			>Register New Game</button>
			<article className="games">
				{
					games.map(game => {
						return <section key={`game--${game.id}`} className="game">
							<div className="game__title">{game.title}</div>
							<div className="game__players">{game.number_of_players} players needed</div>
							<div className="game__description">{game.description}</div>
							<div className="game__type"></div>{game.game_type.label}
						</section>
					})
				}
			</article>
		</>
	)
}