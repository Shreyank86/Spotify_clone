import { createContext, useContext, useState } from "react";

export const SongContext = createContext();

export function SongProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <SongContext.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </SongContext.Provider>
  );
}

// ✅ Custom hook to easily use context
export function useSong() {
  return useContext(SongContext);
}
