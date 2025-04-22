import axios from 'axios';
import { API_HOST, TEST_TOKEN } from '../constants/apiConstants';
import serializeParams from '../utils/serializeParams';

const api = axios.create({
    baseURL: API_HOST,
    headers: {
        Authorization: `Bearer ${TEST_TOKEN}`,
    },
});
// export const getCalls = async (filters = {}) => {
//     try {
//         const response = await api.post('/mango/getList', {
//             params: serializeParams(filters),
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         throw error;
//     }
// };
export const getCalls = async (
    params: {
        date_start?: string;
        date_end?: string;
        in_out?: 0 | 1;
        limit?: number;
        offset?: number;
        sort_by?: 'date' | 'duration';
        order?: 'ASC' | 'DESC';
        status?: 'success' | 'fail';
    } = {}
) => {
    try {
        const queryString = new URLSearchParams(params as any).toString();
        const response = await api.post(`/mango/getList?${queryString}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};
