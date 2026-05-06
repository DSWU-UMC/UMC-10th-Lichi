/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

interface IModeContext {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ModeContext = createContext<IModeContext | undefined>(undefined);

export const ModeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<IModeContext["mode"]>(() => {
    // 1. 로컬 스토리지에서 모드 정보 가져오기
    const savedMode = localStorage.getItem("mode");
    // 2. 유효한 모드 정보가 있다면 사용,
    if (savedMode === "light" || savedMode === "dark") {
      // 3. 없다면 시스템 설정에 따라 초기값 결정
      return savedMode;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // 모드가 변경될 때마다 HTML 요소에 클래스 토글 및 로컬 스토리지에 저장
  useEffect(() => {
    // 1. HTML 요소에 .dark 클래스를 붙이기
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }

  return context;
};
