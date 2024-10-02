import type { TCreateCard, TUpdateCard } from "../types/card.type";
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

export const updateCard = async (data: TUpdateCard) => {
	const { deckId, id, ...rest } = data;
	const response = await axiosInstance.patch(
		`${API_URL}/v1/decks/${deckId}/cards/${id}`,
		rest,
	);
	return response.data;
};

export const deleteCard = async ({
	deckId,
	cardId,
}: { deckId: string; cardId: string }) => {
	const response = await axiosInstance.delete(
		`${API_URL}/v1/decks/${deckId}/cards/${cardId}`,
	);
	return response;
};

// export const deleteDeck = async (deckId: string) => {
// 	const response = await axiosInstance.delete(`${API_URL}/v1/deck/${deckId}`);
// 	return response;
// };