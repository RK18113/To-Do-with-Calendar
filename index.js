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
    '6':    `<div class="todoTask-box"><div class="task todoTask" id="6">Complete frontend challenge</div> <button class="deleteBtn">Delete</button></div> <div class="todoTask-box"><div class="task todoTask" id="6">Complete UI/UX challenge </div> <button class="deleteBtn">Delete</button></div>`,
    '7':    `<div class="todoTask-box"><div class="task todoTask" id="7">Do something</div> <button class="deleteBtn">Delete</button></div> <div class="todoTask-box"><div class="task todoTask" id="7">Finish personal project</div> <button class="deleteBtn">Delete</button></div>`
};

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
});

newTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask(newTask.value.trim());
        newTask.value = '';
    }
});

function addTask(task) {
        
    let dateKey = taskDate.innerText;
    let newTaskHtml = `<div class="todoTask-box"><div class="task todoTask" id="${dateKey}">${task}</div> <button class="deleteBtn" id="${dateKey}">Delete</button></div>`;
    
    if (task.trim() !== ''){
        if (taskObj[dateKey]) {
            taskObj[dateKey] += newTaskHtml;
        } else {
            taskObj[dateKey] = newTaskHtml;
        }
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
    displayTasks(date.getDate());
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
        taskCont.innerHTML = '<div class="task">No tasks for this date.</div>';
    }

    if (taskObj[selectedDate + 1]) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(taskObj[selectedDate + 1], 'text/html');

        doc.querySelectorAll('.deleteBtn').forEach(button => button.remove());

        upcomingTaskCont.innerHTML = doc.body.innerHTML;
    } else {
        upcomingTaskCont.innerHTML = '<div class="task">No Upcoming tasks.</div>';
    }

}

taskCont.addEventListener('click', (event) => {
    if (event.target.classList.contains('deleteBtn')) {
        const button = event.target;
        let htmlString = taskObj[taskDate.innerText].replace(button.parentElement.outerHTML, '');
        taskObj[taskDate.innerText] = htmlString;
        taskCont.innerHTML = taskObj[taskDate.innerText];
        console.log(taskObj[taskDate.innerText]);
    }
});

renderCalendar();
