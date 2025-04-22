import React, { createContext, useState } from 'react';

export interface AudioContextType {
    playingId: string | null;
    setPlayingId: (id: string | null) => void;
}

export const AudioContext = createContext<AudioContextType>({
    playingId: null,
    setPlayingId: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [playingId, setPlayingId] = useState<string | null>(null);
    return (
        <AudioContext.Provider value={{ playingId, setPlayingId }}>
            {children}
        </AudioContext.Provider>
    );
};
