import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // localStorage에서 사용자 정보를 가져옵니다.
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [nickname, setNickName] = useState(() => {
    const savedNickName = localStorage.getItem("nickname");
    return savedNickName ? JSON.parse(savedNickName) : null;
  });

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
  };

  const logout = () => {
    setUser(null);
    // localStorage에서 사용자 정보를 삭제합니다.
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
