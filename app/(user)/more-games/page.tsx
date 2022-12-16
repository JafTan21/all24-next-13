import Link from "next/link";
import React from "react";
import { IOptionGameConfig, OptionGames } from "./OptionGames";
import "./option-game.scss";
import UserPageWrapper from "../../../components/Wrappers/UserPageWrapper";

export default function MoreGames() {
  return (
    <UserPageWrapper>
      <div className="games">
        {Object.values(OptionGames).map((game: IOptionGameConfig) => {
          return (
            <div className="game" key={game.name}>
              <Link href={`/more-games/play/${game.name}`}>
                <div className="flex flex-col justify-center items-center ">
                  <img
                    alt={game.name}
                    src={game.images.logo}
                    className="h-28 "
                  />
                  <span className="text-white text-lg mb-4">{game.name}</span>
                </div>
              </Link>
              <div className="absolute bottom-[-20px] w-full flex justify-between">
                <Link
                  href={`/more-games/play/${game.name}`}
                  className="game-link"
                >
                  Play now
                </Link>
                <Link
                  href={`/statements/more-games/${game.name}`}
                  className="game-link"
                >
                  statement
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </UserPageWrapper>
  );
}
