import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Context = createContext(null);

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedAccess = localStorage.getItem("accessToken");
        const storedRefresh = localStorage.getItem("refreshToken");
        const storedUser = localStorage.getItem("user");

        if (storedAccess && storedRefresh && storedUser) {
            setAccessToken(storedAccess);
            setRefreshToken(storedRefresh);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (access, refresh, userData) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        setUser(userData);

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };


    const refreshAccessToken = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error("Refresh Faild")
                throw new Error("Refresh failed");
            }

            setAccessToken(data.access);
            localStorage.setItem("accessToken", data.access);

            return data.access;
        } catch (err) {
            logout();
            return null;
        }
    };
    const fetchWithAuth = async (url, options = {}) => {
        let token = accessToken;
        console.log(url, options);

        let res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.status);


        if (res.status === 401) {
            const newToken = await refreshAccessToken();
            if (!newToken) return null;

            res = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newToken}`,
                },
            });
        }
        return res;
    };

    return (
        <Context.Provider value={{
            user,
            accessToken,
            refreshToken,
            login,
            logout,
            refreshAccessToken,
            loading,
            fetchWithAuth,
            isAuthenticated: !!accessToken,
        }}>
            {!loading && children}
        </Context.Provider>
    );
};

export default AuthContext;
