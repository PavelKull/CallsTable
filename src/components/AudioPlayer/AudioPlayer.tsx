import React, { useEffect, useRef, useState } from 'react';
import getCallRecord from '../../api/getCallRecording';
import formatDuration from '../../utils/formatDuration';
import { useDownloadFile } from '../../hooks/useDownloadFile';
import Play from '../../assets/icons/Play';
import DownloadIcon from '../../assets/icons/DownloadIcon';
import Cross from '../../assets/icons/Cross';
import PauseIcon from '../../assets/icons/Pause';
import useAudio from '../../hooks/useAudio';

import s from './AudioPlayer.module.scss';

interface AudioPlayerProps {
    recordId: string;
    partnershipId: string;
    duration: number;
}

let currentAudioRef: HTMLAudioElement | null = null;
let currentSetIsPlaying: React.Dispatch<React.SetStateAction<boolean>> | null =
    null;

const AudioPlayer: React.FC<AudioPlayerProps> = ({
    recordId,
    partnershipId,
    duration,
}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioUrl = useAudio(recordId, partnershipId);

    const { downloadFile } = useDownloadFile({
        downloadFunction: getCallRecord,
        fileName: recordId,
        fileType: 'mp3',
    });

    useEffect(() => {
        const el = audioRef.current;
        if (!el) return;
        const update = () => {
            const pct = (el.currentTime / (el.duration || 1)) * 100;
            setProgress(pct);
            setCurrentTime(Math.floor(el.currentTime));
        };
        el.addEventListener('timeupdate', update);
        return () => {
            el.removeEventListener('timeupdate', update);

            if (currentAudioRef === el) {
                currentAudioRef = null;
                currentSetIsPlaying = null;
            }
        };
    }, []);

    const togglePlayPause = () => {
        const el = audioRef.current;
        if (!el) return;

        if (isPlaying) {
            el.pause();
            setIsPlaying(false);

            if (currentAudioRef === el) {
                currentAudioRef = null;
                currentSetIsPlaying = null;
            }
        } else {
            if (currentAudioRef && currentAudioRef !== el) {
                currentAudioRef.pause();
                currentSetIsPlaying?.(false);
            }

            currentAudioRef = el;
            currentSetIsPlaying = setIsPlaying;

            el.play()
                .then(() => setIsPlaying(true))
                .catch(console.error);
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const p = parseFloat(e.target.value);
        const el = audioRef.current;
        if (el && !isNaN(p)) {
            const newTime = (p / 100) * (el.duration || 0);
            el.currentTime = newTime;
            setProgress(p);
        }
    };

    const handleClear = () => {
        const el = audioRef.current;
        if (el) el.pause();
        setProgress(0);
        setCurrentTime(0);
        setIsPlaying(false);

        if (currentAudioRef === el) {
            currentAudioRef = null;
            currentSetIsPlaying = null;
        }
    };

    return (
        <div className={s.audioPlayer}>
            <span className={s.time}>
                {isPlaying
                    ? formatDuration(currentTime)
                    : formatDuration(duration)}
            </span>

            <button className={s.playButton} onClick={togglePlayPause}>
                {isPlaying ? <PauseIcon /> : <Play />}
            </button>

            <audio ref={audioRef} controls={false}>
                {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
                Ваш браузер не поддерживает аудио.
            </audio>

            <div className={s.progress}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className={s.progressBar}
                    style={{
                        background: `linear-gradient(to right, #007bff ${progress}%, rgba(173, 191, 223, 1) ${progress}%)`,
                    }}
                />
            </div>

            <button
                className={s.downloadButton}
                onClick={() => downloadFile(recordId, partnershipId)}
            >
                <DownloadIcon />
            </button>

            <button
                className={s.deleteButton}
                onClick={handleClear}
                disabled={!audioUrl}
            >
                <Cross />
            </button>
        </div>
    );
};

export default AudioPlayer;
