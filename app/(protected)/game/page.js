"use client";

import ScrabbleBoard from "@/app/components/Board";
import { saveGameToFirestore } from "@/app/lib/saveGame";
import { useAuth } from "@/app/lib/AuthContext";



export default function GamePage() {

  const { user } = useAuth();

  const gameState = [
  { x: 7, y: 7, letter: "S", player: 1 },
  { x: 8, y: 7, letter: "C", player: 1 },
  { x: 9, y: 7, letter: "R", player: 2 },
];

  const currentMove = [
  { x: 7, y: 8, letter: "A" },
  { x: 7, y: 9, letter: "N" },
];

const handleSave = async () => {
    await saveGameToFirestore(gameState, currentMove, user.uid);
    alert("Gra została zapsiana");
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Scrabble</h1>

        <ScrabbleBoard gameState={gameState} currentMove={currentMove} />
        <button onClick={handleSave} className="px-4 py-2 rounded-md font-semibold bg-gray-700 hover:bg-gray-600 cursor-pointer">
          Save game
        </button>
        </div>
      </div>
  );
}
