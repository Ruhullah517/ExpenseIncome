
const processExpenses = (expenses) => {
    // Initialize statistics structure
    const stats = {
        Day: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: Array(7).fill(0) },
        Week: { labels: ['W1', 'W2', 'W3', 'W4'], data: Array(4).fill(0) },
        Month: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], data: Array(12).fill(0) },
        Year: { labels: ['2020', '2021', '2022', '2023', '2024'], data: Array(5).fill(0) },
    };

    expenses.forEach(expense => {
        const date = new Date(expense.date);

        // Group by day (Day of the week: Mon-Sun)
        const dayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)
        stats.Day.data[dayOfWeek === 0 ? 6 : dayOfWeek - 1] += parseFloat(expense.amount); // Adjust to start from Monday

        // Group by week (Weeks in current month)
        const weekOfMonth = Math.ceil(date.getDate() / 7);
        stats.Week.data[weekOfMonth - 1] += parseFloat(expense.amount);

        // Group by month (Jan-Dec)
        const month = date.getMonth(); // 0 (Jan) - 11 (Dec)
        stats.Month.data[month] += parseFloat(expense.amount);

        // Group by year (2020-2024)
        const year = date.getFullYear();
        const yearIndex = stats.Year.labels.indexOf(String(year));
        if (yearIndex !== -1) {
            stats.Year.data[yearIndex] += parseFloat(expense.amount);
        }
    });

    return stats;
};


const fetchExpenses = async (currentAccountId) => {
    try {
        const response = await axios.get(`http://192.168.137.1:3000/accounts/${currentAccountId}/expenses`);
        console.log("expenses : ", response.data);

    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
    return response;
};
