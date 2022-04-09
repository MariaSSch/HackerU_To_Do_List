const taskHolder = document.querySelector("#task_holder");
const doneChecked = document.querySelector("#done_num");
const canceledChecked = document.querySelector("#canceled_num");

//-------LocalStorage for TaskList 
const savedTasks = () => JSON.parse(localStorage.getItem("taskList")) || [];
const writeTasks = data => localStorage.setItem("taskList", JSON.stringify(data));
//-------LocalStorage for the Number of Done Tasks 
const savedDone = () => localStorage.getItem("taskDone") || 0;
const writeDone = data => localStorage.setItem("taskDone", data);
//-------LocalStorage for the Number of Canceled Tasks 
const savedCanceled = () => localStorage.getItem("taskCanceled") || 0;
const writeCanceled = data => localStorage.setItem("taskCanceled", data);

doneChecked.innerText = savedDone();
canceledChecked.innerText = savedCanceled();

let taskList = savedTasks(); //массив заданий

document.forms[0].addEventListener("submit", event => {
    event.preventDefault();
    const name = event.target.name.value;
    const note = event.target.note.value;

    if (event.target.name.value =="" && event.target.note.value == ""){
        alert("Заполните хотя бы одно поле");
    } else {
        taskList.push({name, note});
    }

    event.target.name.value = "";
    event.target.note.value = "";

    writeTasks(taskList);
    render(taskList);
});

function render(list){
    taskHolder.innerText = "";
    list.forEach(elem => {
        const taskElem = document.createElement("div");

        const taskInfo = document.createElement("div");
        const taskName = document.createElement("p");
        const taskNote = document.createElement("p");

        const taskChecked = document.createElement("div");
        const taskDone = document.createElement("div");
        const taskCanceled = document.createElement("div");

        taskElem.classList.add("task");
        taskInfo.classList.add("task_info");
        taskName.classList.add("task_name");
        taskNote.classList.add("task_note");
        taskChecked.classList.add("task_checked");
        taskDone.classList.add("done");
        taskCanceled.classList.add("canceled");

        taskName.innerText = elem.name;
        taskNote.innerText = elem.note;

        taskInfo.append(taskName, taskNote);
        taskChecked.append(taskDone, taskCanceled);

        taskElem.append(taskInfo, taskChecked);
        taskHolder.append(taskElem);

    
        taskDone.addEventListener("click", () => {
            if(elem.status) {
                delete elem.status;
            } else {
                elem.status = true;
            }
            taskCalc(taskList);
            render(taskList);
            writeTasks(taskList);
        });

       taskCanceled.addEventListener("click", () => {
            if(elem.status === false) {
                delete elem.status;
            } else {
                elem.status = false;
            }
            taskCalc(taskList);
            render(taskList);
            writeTasks(taskList);
        });

    
        if (elem.status) {
            taskDone.classList.toggle("d_active");

        } else if (elem.status === false){
            taskCanceled.classList.toggle("c_active");

        } 

        /*****----Task delete----**** */

       taskInfo.addEventListener("dblclick", () => {
        taskList = taskList.filter(item => taskList.indexOf(item) !== taskList.indexOf(elem));
       
        taskCalc(taskList);
        render(taskList);
        writeTasks(taskList);
        });
    });
    tdefault();

}

render(taskList);

function taskCalc(list){
    let d = 0;
    let c = 0;
    if(list.length > 0){
    list.forEach(elem => {
        if (elem.status === true) {
            d++;
        } else if (elem.status === false) {
            c++;
        } 
    });
    }
    doneChecked.innerText = d;
    canceledChecked.innerText = c;

    writeDone(d);
    writeCanceled(c);
}

function tdefault(){
    if (taskList.length === 0) {
        const taskDefault = document.createElement("img");
        taskDefault.src = "media/nothing.png";
        taskHolder.appendChild(taskDefault);
    }
}
