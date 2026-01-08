import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthResponse, User } from "../models/interfaces";
import { tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthService {
    private API_URL = "http://localhost:4000/api/users";

    constructor(private http: HttpClient) {}

    login(credentials: any) {
        return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem("authToken", response.token);
                }
            })
        );
    }

    signup(userData: any) {
        return this.http.post<AuthResponse>(`${this.API_URL}/signup`, userData);
    }

    getToken() {
        return localStorage.getItem("authToken");
    }

    logout() {
        localStorage.removeItem("authToken");
    }
}