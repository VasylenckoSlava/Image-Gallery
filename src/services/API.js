// @flow
import axios from "axios";
import { AsyncStorage } from "react-native";

const API_KEY = '23567b218376f79d9415' // other valid API keys: '760b5fb497225856222a', '0e2a751704a65685eefc'
const API_ENDPOINT = 'http://195.39.233.28:8035'

export async function getPictures (page: number = 1): Array<Object> {
    let query = page > 1 ? `?page=${page}` : "";
    const token = await AsyncStorage.getItem("token");
    return axios({
        method: "get",
        url: `${API_ENDPOINT}/images${query}`,
        headers: {
            Authorization: "Bearer " + token
        }
    });
}

export async function getPictureDetails(id: number): Object {
    const token = await AsyncStorage.getItem("token");
    return axios({
        method: "get",
        url: `${API_ENDPOINT}/images/${id}`,
        headers: {
            Authorization: "Bearer " + token
        }
    });
}

export async function getToken(): Object {
    return axios({
        method: "post",
        url: `${API_ENDPOINT}/auth`,
        data: { apiKey: API_KEY }
    });
}
