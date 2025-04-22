 function getTime(dateStr: string): string {
    const timePart = dateStr.split(' ')[1];
    if (!timePart) return '';

    const [hours, minutes] = timePart.split(':');
    return `${hours}:${minutes}`;
}

export default getTime;
