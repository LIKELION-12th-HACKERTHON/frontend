import axios from "axios";
import useMemberStore from "../store/memberStore";

const api = axios.create({
	baseURL: "https://ourvege.store",
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response && error.response.status === 401) {
			// 토큰 갱신 로직 추가
			try {
				const refreshToken = localStorage.getItem("refreshToken");
				const response = await axios.post("https://ourvege.store/auth/token/refresh/", {
					refresh: refreshToken,
				});
				localStorage.setItem("accessToken", response.data.access);
				error.config.headers["Authorization"] = `Bearer ${response.data.access}`;
				return axios(error.config);
			} catch (refreshError) {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				useMemberStore.getState().setLoginMember(null);
				window.location = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default api;
