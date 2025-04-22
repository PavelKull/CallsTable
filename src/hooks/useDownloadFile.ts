import { useState } from 'react';

interface UseDownloadFileProps {
    downloadFunction: (
        recordId: string,
        partnershipId: string
    ) => Promise<Blob>;
    fileName: string;
    fileType: string;
}

export const useDownloadFile = ({
    downloadFunction,
    fileName,
    fileType,
}: UseDownloadFileProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const downloadFile = async (recordId: string, partnershipId: string) => {
        try {
            setIsLoading(true);
            setError(null);
            const blob = await downloadFunction(recordId, partnershipId);

            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${fileName}.${fileType}`;

            link.click();

            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Ошибка при скачивании:', err);
            setError('Не удалось скачать файл');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, downloadFile };
};
