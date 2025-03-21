import AsyncStorage from "@react-native-async-storage/async-storage";

const urls = {
  production: {
    authenURL: "https://furecods.site/api/auth",
    tradeURL: "http://127.0.0.1:8082/profile",
    userURL: "http://127.0.0.1:8082/profile",
    stockURL: "http://127.0.0.1:8082/profile",
    url: "http://127.0.0.1:4000"
  },
  development: {
    authenURL: "https://furecods.site/api/auth",
    tradeURL: "http://127.0.0.1:8082/profile",
    userURL: "http://127.0.0.1:8082/profile",
    stockURL: "http://127.0.0.1:8082/profile",
    url: "http://localhost:4000"
  },
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    return refreshToken;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

const { production, development } = urls;
export const appUrls = true ? development : production;
