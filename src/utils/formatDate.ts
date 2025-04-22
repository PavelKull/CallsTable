const formatDate = (iso: string) => {
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
};
export default formatDate;
