const monYearElement = document.getElementById('monAndYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

console.log(currentDate)

const updateCalendar = () => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Display month and year in monAndYear
  const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  monYearElement.textContent = monthYearString;

  // Calculate dates
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfWeek = new Date(currentYear, currentMonth + 1, 0).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  let datesHTML = '';

  // Add previous month's dates
  for (let i = (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); i >= 0; i--) {
    datesHTML += `<div class="date inactive">${prevMonthDays - i}</div>`;
  }

  // Add current month's dates
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = new Date(currentYear, currentMonth, i).toDateString() === new Date().toDateString();
    datesHTML += `<div class="date ${isToday ? 'active' : ''}">${i}</div>`;
  }

  // Add next month's dates
  for (let i = 1; i < (7 - (lastDayOfWeek === 0 ? 7 : lastDayOfWeek)); i++) {
    datesHTML += `<div class="date inactive">${i}</div>`;
  }

  // Update the dates container
  datesElement.innerHTML = datesHTML;
};

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();

