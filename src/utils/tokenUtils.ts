export const setToken = (accessToken: string, refreshToken: string) => {
	localStorage.setItem("access_token", accessToken);
	localStorage.setItem("refresh_token", refreshToken);
};

export const getTokens = () => {
	return {
		accessToken: localStorage.getItem("access_token"),
		refreshToken: localStorage.getItem("refresh_token"),
	};
};

export const removeToken = () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
};
