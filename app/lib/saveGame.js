import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export async function saveGameToFirestore(gameState, currentMove, userId) {
  await addDoc(collection(db, "games"), {
    gameState,
    currentMove,
    userId,
    createdAt: serverTimestamp(),
  });
}
