function formatPhoneNumber(input: string): string {
    const raw = input.replace(/[^\d*]/g, '');

    let core = raw;
    if ((raw.startsWith('7') || raw.startsWith('8')) && raw.length > 10) {
        core = raw.slice(1);
    }

    const parts = core.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    if (!parts) return input;

    const [, p1 = '', p2 = '', p3 = '', p4 = ''] = parts;

    let result = '+7';
    if (p1) result += ` (${p1}`;
    if (p1.length === 3) result += ')';
    if (p2) result += ` ${p2}`;
    if (p3) result += `-${p3}`;
    if (p4) result += `-${p4}`;

    return result;
}

export default formatPhoneNumber;
