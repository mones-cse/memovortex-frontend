import type { TCreateCard } from "../types/card.type";
import { axiosInstance } from "../utils/axiosConfig";

const API_URL = import.meta.env.VITE_API_URL;

export const createCard = async (data: TCreateCard) => {
	const { deckId, ...rest } = data;
	const response = await axiosInstance.post(
		`${API_URL}/v1/decks/${deckId}/cards`,
		rest,
	);
	return response.data;
};

export const fetchCards = async (deckId: string) => {
	console.log("🚀 ~ fetchCards ~ deckId:", deckId);
	const result = await axiosInstance.get(`${API_URL}/v1/decks/${deckId}/cards`);
	return result.data;
};

// export const fetchDecks = async () => {
// 	const result = await axiosInstance.get(`${API_URL}/v1/deck`);
// 	return result.data;
// };

// export const deleteDeck = async (deckId: string) => {
// 	const response = await axiosInstance.delete(`${API_URL}/v1/deck/${deckId}`);
// 	return response;
// };

// export const updateDeck = async (data: TUpdateDeck) => {
// 	const response = await axiosInstance.patch(`${API_URL}/v1/deck/${data.id}`, {
// 		deckTitle: data.deckTitle,
// 		deckDescription: data.deckDescription,
// 	});
// 	return response.data;
// };
