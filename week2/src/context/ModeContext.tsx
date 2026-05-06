import { createContext, useState, type PropsWithChildren } from "react";
import { useContext } from "react";

interface IModeContext {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ModeContext = createContext<IModeContext | undefined>(undefined);

export const ModeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<IModeContext["mode"]>("light");

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
