const displayDate = data => {
    const date = new Date(Number(data));
    const now = new Date();
    const yearsDif = now.getFullYear() - date.getFullYear();
    if (yearsDif !== 0) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    const daysDif = now.getDate() - date.getDate();
    if (daysDif !== 0) return `${date.getDate()}.${date.getMonth() + 1}`;
    const hoursDif = now.getHours() - date.getHours();
    if (hoursDif !== 0) {
        return `${date.getHours()}:${
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
        }`;
    }
    const minutesDif = now.getMinutes() - date.getMinutes();
    if (minutesDif >= 30) return "30 минут назад";
    if (minutesDif >= 10) return "10 минут назад";
    if (minutesDif >= 5) return "5 минут назад";
    return "1 минуту назад";
};

export default displayDate;
