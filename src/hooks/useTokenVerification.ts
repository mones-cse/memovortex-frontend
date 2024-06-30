import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import type { User } from "../types/auth.type";
import { getTokens } from "../utils/tokenUtils";

export const useTokenVerification = (logout: () => void) => {
	return useCallback((): User | null => {
		const { accessToken: token } = getTokens();
		if (!token) return null;

		try {
			const decodedToken = jwtDecode<User & { exp: number }>(token);
			const currentTime = Date.now() / 1000;
			if (decodedToken.exp < currentTime) {
				logout();
				return null;
			}

			return {
				sub: decodedToken.sub,
				email: decodedToken.email,
			};
		} catch (error) {
			console.error("Error decoding token:", error);
			logout();
			return null;
		}
	}, [logout]);
};
