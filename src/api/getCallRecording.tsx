import axios from 'axios';
import { TEST_TOKEN } from '../constants/apiConstants';

const getAudioRecord = async (
    recordId: string,
    partnershipId: string
): Promise<Blob> => {
    const response = await axios.post(
        `https://api.skilla.ru/mango/getRecord?record=${recordId}&partnership_id=${partnershipId}`,
        null,
        {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${TEST_TOKEN}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );

    return response.data;
};

export default getAudioRecord;
