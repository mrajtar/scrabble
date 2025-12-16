https://scrabble-game-eta.vercel.app/

Projekt komponentu planszy scrabble z funkcjonujacym firebase auth oraz zapisywaniem stanu gry w firestore.
Komponent przyjmuje dwa parametry:
	•	gameState – struktura danych zawierająca litery już ułożone na planszy wraz z informacją, który gracz je umieścił,
	•	currentMove – ciąg liter wraz z ich współrzędnymi, reprezentujący aktualny ruch gracza.

Plansza:
	•	ma rozmiar 15×15 pól,
	•	wyświetla litery ułożone przez poszczególnych graczy,
	•	wizualnie wyróżnia aktualny ruch gracza,
	•	oblicza i prezentuje liczbę punktów dla każdego gracza.