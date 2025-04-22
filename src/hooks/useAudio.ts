import { useEffect, useState } from 'react';
import getAudioRecord from '../api/getCallRecording';

const useAudio = (recordId: string, partnershipId: string) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAudio = async () => {
            try {
                const blob = await getAudioRecord(recordId, partnershipId);
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            } catch (error) {
                console.error('Failed to fetch audio:', error);
            }
        };

        fetchAudio();

        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [recordId, partnershipId]);

    return audioUrl;
};

export default useAudio;
