import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // localStorage에서 사용자 정보를 가져옵니다.
    const savedUser = localStorage.getItem("user");
    // return savedUser ? JSON.parse(savedUser) : null;
    return savedUser ? JSON.parse(savedUser) : { key: 0 };
  });

  const [isLogin, setIsLogin] = useState(true);
  
  useEffect(() => {
    // user 상태가 변경될 때마다 localStorage에 저장합니다.
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsLogin(true);
  };

  const logout = () => {
    setUser({ key: 0 });
    // localStorage에서 사용자 정보를 삭제합니다.
    localStorage.removeItem("user");
    Cookies.remove("accessToken");

    setIsLogin(false);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLogin, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);