export const downloadCall = async (
    recordId: string,
    partnershipId: string
): Promise<Blob> => {
    try {
        const response = await fetch(
            `/api/call-records/${recordId}?partnershipId=${partnershipId}`
        );

        if (!response.ok) {
            throw new Error('Не удалось получить аудиофайл');
        }

        return await response.blob();
    } catch (error) {
        console.error('Ошибка при скачивании записи:', error);
        throw error;
    }
};
export default downloadCall;
