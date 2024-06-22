const dateTag = document.querySelector(".date");
const taskDate = document.querySelector(".current-date");
const taskMonth = document.querySelector(".current-month");
const taskYear = document.querySelector(".current-year");
const topMonthYear = document.querySelector(".month-year");
const taskCont = document.querySelector('.task-container');
const upcomingTaskCont = document.querySelector('.upcoming-task-container');
const newTask = document.querySelector('#new-task');
const addBtn = document.querySelector('.addBtn');

const taskObj = {
    '6': '<span class="task">Complete frontend challenge</span> <span class="task">Complete UI/UX challenge</span>',
    '7': '<span class="task">Do something</span> <span class="task">Finish personal project</span>'
}

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

taskDate.innerText = `${date.getDate()}`;
taskMonth.innerText = `${months[date.getMonth()]}`;
taskYear.innerText = `${date.getFullYear()}`;

topMonthYear.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;

addBtn.addEventListener('click', () => {
    addTask(newTask.value.trim());
    newTask.value = '';
})

newTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask(newTask.value.trim());
        newTask.value = '';
    }
});

function addTask(task) {
    let dateKey = taskDate.innerText;
    let newTaskHtml = `<span class="task">${task}</span>`;

    if (taskObj[dateKey]) {
        taskObj[dateKey] += newTaskHtml;
    } else {
        taskObj[dateKey] = newTaskHtml;
    }

    displayTasks(dateKey);
}

function renderCalendar() {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = '';

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear() ? "today" : "";

        if (taskObj[`${i}`]) {
            liTag += `<li class="${isToday} taskGiven">${i}</li>`;
        } else {
            liTag += `<li class="${isToday}">${i}</li>`;
        }
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    dateTag.innerHTML = liTag;

    addDayClickEvents();
    displayTasks();
}

function addDayClickEvents() {
    document.querySelectorAll(".date li").forEach(day => {
        day.addEventListener("click", (event) => {
            document.querySelectorAll(".date li").forEach(date => {
                date.style.backgroundColor = '';
            });

            if (!day.classList.contains("inactive")) {
                taskDate.innerText = `${event.target.innerText}`;
                taskMonth.innerHTML = `${months[currMonth]}`;
                taskYear.innerHTML = `${currYear}`;
                event.target.style.backgroundColor = '#5ED3EC';
            }

            displayTasks(parseInt(event.target.innerText));
        });
    });
}

function displayTasks(selectedDate) {
    if (taskObj[selectedDate]) {
        taskCont.innerHTML = taskObj[selectedDate];
    } else {
        taskCont.innerHTML = '<span class="task">No tasks for this date.</span>';
    }

    if (taskObj[selectedDate + 1]) {
        upcomingTaskCont.innerHTML = taskObj[selectedDate + 1];
    } else {
        upcomingTaskCont.innerHTML = '<span class="task">No Upcoming tasks.</span>';
    }
}

renderCalendar();
