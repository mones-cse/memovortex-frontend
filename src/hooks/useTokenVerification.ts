import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { newAccessTokenByRefreshToken } from "../api/auth";
import type { User } from "../types/auth.type";
import { getTokens, setToken } from "../utils/tokenUtils";

const fetchRefreshToken = async (refreshToken: string) => {
	try {
		const response = await newAccessTokenByRefreshToken(refreshToken);
		const new_access_token = response.data.data.access_token;
		const old_refresh_token = getTokens().refreshToken;
		setToken(new_access_token, old_refresh_token || "fuck");
		return response;
	} catch (error) {
		console.log("🚀 ~ fetchRefreshToken ~ error:", error);
		return false;
	}
};

export const useTokenVerification = (logout: () => void) => {
	return useCallback(async (): Promise<User | null> => {
		const { accessToken: token, refreshToken } = getTokens();
		if (!token) return null;

		try {
			const decodedToken = jwtDecode<User & { exp: number }>(token);
			// console.log("🚀 ~ returnuseCallback ~ decodedToken:", decodedToken);

			const currentTime = Date.now() / 1000;
			if (decodedToken.exp < currentTime) {
				console.log(
					"Access Token Expired Ask for new Access Token using Refresh Token",
				);
				const isNewAccessTokenAvailable = await fetchRefreshToken(
					refreshToken || "",
				);
				if (isNewAccessTokenAvailable === false) {
					logout();
					return null;
				}
			}
			console.log("🚀 ~ decodedToken is valid ", decodedToken);
			return {
				sub: decodedToken.sub,
				email: decodedToken.email,
				fullName: decodedToken.fullName,
			};
		} catch (error) {
			console.error("Error decoding token:", error);
			logout();
			return null;
		}
	}, [logout]);
};
