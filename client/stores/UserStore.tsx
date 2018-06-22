import {action, observable} from "mobx";
import {getCookie, setCookie} from "../utils/cookie";

export class UserStore {
    @observable private token: string = null;
    @observable private username: string = null;
    @observable private userId: number = 0;

    getToken(req?: any) {
        return this.token || getCookie(req).token;
    }

    getUsername(req?: any) {
        return this.username || getCookie(req).username;
    }

    getUserId(req?: any) {
        return this.userId || parseInt(getCookie(req).userId);
    }

    @action setToken(token: string, req?: any) {
        this.token = token;
        setCookie("token", token, req);
    }

    @action setUsername(username: string) {
        this.username = username;
        setCookie("username", username);
    }

    @action setUserId(userId: number) {
        this.userId = userId;
        setCookie("userId", userId);
    }
}