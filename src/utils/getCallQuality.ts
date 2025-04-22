type CallQuality = 'excellent' | 'good' | 'bad';

interface CallRecord {
    errors: unknown[];
    results: unknown[];
}

const getCallQuality = (record: CallRecord): CallQuality => {
    if (record.errors.length > 0) return 'bad';
    if (record.results.length > 0) return 'excellent';
    return 'good';
};
export default getCallQuality;
