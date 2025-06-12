const inputNameTask = document.getElementById('task');
const inputDateTask = document.getElementById('date');
const inputDescrTask = document.getElementById('description');
const btnAdd = document.querySelector('.btn--add');
const btnFilter = document.querySelector('.btn--filter')

const toDoHTML = document.querySelector('.container__todo');
const doneHTML = document.querySelector('.container__done');

const today = new Date();


const toDoTab = [];
const doneTab = [];

class Task {
    constructor(nom, date, description){
        this.nom = nom;
        this.date = date;
        this.description = description;
    }
}

function setToday() {
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    const setToday = `${year}-${month}-${day}`

    inputDateTask.setAttribute('min', `${setToday}`);
    inputDateTask.setAttribute('value', `${setToday}`);  
}
setToday();

function setDate(date) {
    const setDate = new Date(date)
    const month = String(setDate.getMonth() + 1).padStart(2, '0');
    const day = String(setDate.getDate()).padStart(2, '0');
    const year = setDate.getFullYear();

    const getDate = `${day}/${month}/${year}`
    return getDate
    
}

function displayTodo(nom, date, description) {
    toDoTab.push(new Task(nom, date, description))
    updateLists();
}


function updateLists() {
    toDoHTML.innerHTML = "";
    toDoTab.forEach((task, index) =>{
        toDoHTML.innerHTML += `
        <details class="task__wrapper" data-id="${index}">
            <summary class="task__infos">
                <div class="task__container">
                    <div class="task__check">
                        <input type="checkbox" class="checkbox" name="checkbox">
                    </div>
                    <div class="task__name">${task.nom}</div>
                </div>
                <div class="task__container">
                    <div class="task__date">${setDate(task.date)}</div>
                </div>
            </summary>
            <div class="task__description">${task.description}</div>
        </details>
        `
    })  

    doneHTML.innerHTML = `<h3 class="title title--done">Done</h3>`;
    doneTab.forEach((task, index) =>{
        doneHTML.innerHTML += `
        <details class="task__wrapper" data-id="${index}">
            <summary class="task__infos">
                <div class="task__container">
                    <div class="task__check">
                        <input type="checkbox" class="checkbox" name="checkbox" checked>
                    </div>
                    <div class="task__name">${task.nom}</div>
                </div>
                <div class="task__container">
                    <div class="task__date">${setDate(task.date)}</div>
                </div>
            </summary>
            <div class="task__description">${task.description}</div>
        </details>
        `
    })
}

btnAdd.addEventListener('click', (e)=>{
    e.preventDefault();
    displayTodo(inputNameTask.value, inputDateTask.value, inputDescrTask.value)
    inputNameTask.value = inputDescrTask.value = "";
    setToday();
})


toDoHTML.addEventListener('click', (e) => {
    const checkbox = e.target.closest('.checkbox');
    if (checkbox && checkbox.checked) {
        const wrapper = checkbox.closest('details');
        const targetID = parseInt(wrapper.dataset.id, 10);
        if (!isNaN(targetID)) {
            doneTab.push(toDoTab[targetID]);
            toDoTab.splice(targetID, 1);
            updateLists();
        }
    }
});

doneHTML.addEventListener('click', (e) => {
    const checkbox = e.target.closest('.checkbox');
    if (checkbox) {
        const wrapper = checkbox.closest('details');
        const targetID = parseInt(wrapper.dataset.id, 10);
        if (!isNaN(targetID)) {
            toDoTab.push(doneTab[targetID]);
            doneTab.splice(targetID, 1);
            updateLists();
        }
    }
});

btnFilter.addEventListener('click', (e)=>{
    toDoTab.sort((a, b) => new Date(a.date) - new Date(b.date));
    updateLists();
})