import axios from "axios";
import constants from "@/global/constants";
import router from "@/router";
import message from "element-ui/packages/message";

export const http = axios.create({
    baseURL: constants.BaseURL,
    timeout: 6000
})

http.interceptors.response.use(resp => {
    if (resp.status !== 200) {
        throw new Error("System error");
    }
    let data = resp.data
    if (data.code === 401) {
        router.push("/login").then()
    }
    if (data.code === 403) {
        router.push({path: "/403", query: {message: data.error}}).then()
    }
    if (data.code === 404) {
        router.push("/404").then()
    }
    if (!data.success) {
        message.error(data.error)
    }
    return data
}, err => {
    return err
})

export function get({url, data, params}) {
    return http({method: "get", url, data, params})
}

export function post({url, data, params}) {
    return http({method: "post", url, data, params})
}

export function put({url, data, params}) {
    return http({method: "put", url, data, params})
}

export function del({url, data, params}) {
    return http({method: "delete", url, data, params})
}