"use client";

  const SIZE = 15;

  const LETTER_POINTS = {
  A: 1, E: 1, I: 1, O: 1, N: 1, R: 1, T: 1, L: 1, S: 1, U:1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y:4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10,
  };

export default function Board({ gameState = [], currentMove = [] }) {

  const getTile = (x, y) => {
    const current = currentMove.find(t => t.x === x && t.y === y);
    if (current) return { ...current, type: "current" };

    const placed = gameState.find(t => t.x === x && t.y === y);
    if (placed) return { ...placed, type: "placed" };

    return null;
  };

   const scores = gameState.reduce(
    (acc, tile) => {
      const points = LETTER_POINTS[tile.letter] || 0;
      acc[tile.player] += points;
      return acc;
    },
    { 1: 0, 2: 0 }
  );

  return (
    <div className="flex flex-col items-center gap-4">

      <div className="flex gap-6">
        <div className="px-4 py-2 rounded-lg bg-emerald-700 border border-[#4ade80]/30">
          Player 1: <span className="font-bold">{scores[1]}</span> pts
        </div>
        <div className="px-4 py-2 rounded-lg bg-sky-700 border border-[#4ade80]/30">
          Player 2: <span className="font-bold">{scores[2]}</span> pts
        </div>
      </div>

      <div
        className="p-4 rounded-xl bg-[#0b1310] border border-[#2a3a34]"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 40px)`,
          gridTemplateRows: `repeat(${SIZE}, 40px)`,
        }}
      >
        {Array.from({ length: SIZE }).map((_, y) =>
          Array.from({ length: SIZE }).map((_, x) => {
            const tile = getTile(x, y);

            return (
              <div
                key={`${x}-${y}`}
                className={`
                  w-8 h-8
                  flex items-center justify-center
                  text-sm font-semibold select-none
                  border border-white/15
                  bg-[#0f1a16]
                  transition-colors duration-150
                  ${
                    tile?.type === "placed" && tile.player === 1
                      ? "bg-emerald-700"
                      : ""
                  }
                  ${
                    tile?.type === "placed" && tile.player === 2
                      ? "bg-sky-700"
                      : ""
                  }
                  ${
                    tile?.type === "current"
                      ? "bg-yellow-500 text-black"
                      : ""
                  }
                `}
              >
                {tile?.letter || ""}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
