let localTask;
document.addEventListener("DOMContentLoaded", loadTaskFromLocalStorage());

function loadTaskFromLocalStorage() {
    var taskDiv = document.getElementById("tasks");
    taskDiv.innerHTML = '';

    localTask = localStorage.getItem('tasks');
    if (localTask) 
    {
        localTask = JSON.parse(localTask);
    } 
    else {
        localTask = [];
    }

    localTask.forEach(function (valueObj) {
        createTask(valueObj);
    });
}

function saveToLocalStorage(taskArr) {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

// create a task

function createTask(ElementObj) {
    

    var taskDiv = document.getElementById("tasks");
    const task = document.createElement("div");
    task.id = ElementObj.id;
    task.style.display = "flex";
    task.style.margin= "0.5%";
    task.style.boxShadow="0px 0px 5px  darkgrey"
    task.style.borderBottom = "2px solid grey";

   

    task.style.backgroundColor="aliceblue";
    task.style.borderRadius="50px";
    task.style.fontFamily="comic Sans MS,comic Sans,cursive";
    task.style.padding="2px";
    task.style.fontSize="10px";


    const taskText = document.createElement("h3");
    taskText.innerHTML = ElementObj.name;
    taskText.style.width = "90%";
    taskText.style.textAlign = "left";
    taskText.style.margin = "10px";
   // taskText.style.borderColor="blue";
    
    task.appendChild(taskText);

    const taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    taskCheck.checked = ElementObj.check;
    if(ElementObj.check){
        taskText.style.textDecoration="line-through";
    
    }
    taskCheck.style.margin = "4px";
    taskCheck.style.width = "30px";
    taskCheck.style.cursor = "pointer";
    
    
    // event for button

    taskCheck.addEventListener("click", function(){
        if(taskCheck.checked){
            ElementObj.check=true;
            taskText.style.textDecoration = "line-through";
            taskText.style.color="grey";
            
            
        }
        else{
            ElementObj.check=false;
            taskText.style.textDecoration = "";
            taskText.style.color="black";
            
        }
        
        // saving changes into the local storage after check or uncheck

        console.log(localTask)
        localTask.forEach( function(value){
        if(value.id == ElementObj.id){
           value.check = ElementObj.check;
        }    
        })
        saveToLocalStorage(localTask);
    })

    task.appendChild(taskCheck);

   ///edit button create
    const editTast = document.createElement('input');
    editTast.type="button";
    editTast.setAttribute("value","CHANGE")
    editTast.style.height ="10%";
    editTast.style.width ="10%";
    editTast.style.padding ="3px";
    editTast.style.boxShadow="0px 0px 2px darkblue"
    editTast.style.backgroundColor="white";
    editTast.style.alignSelf = "center"
    editTast.style.cursor = "pointer";
    //event for button
    editTast.style.alignSelf = "center"
    editTast.addEventListener("click",function(){
        let newName = prompt("Enter a new name for this task!");
        if (newName != null) {
            ElementObj.name = newName;  
            taskText.innerHTML = newName;
           
            // saving changes to local storage after changing the name of task
           
            localTask.forEach( function(value){
                if(value.id == ElementObj.id){
                    value.name = newName;
                    }
            })
            saveToLocalStorage(localTask);
            }
        });
    task.appendChild(editTast);
    taskDiv.appendChild(task);



      
    const deleteTask = document.createElement("input");
    deleteTask.type = "button";
    deleteTask.setAttribute("value", "X");
    deleteTask.style.alignSelf = "center"
    deleteTask.style.height = "20%";
    deleteTask.style.padding ="8px";
    deleteTask.style.margin = "14px";
    deleteTask.style.color = "White";
    deleteTask.style.fontSize = "10px";
    deleteTask.style.boxSizing = "0px 0px 2px darkblue";
    deleteTask.style.backgroundColor="rgb(30, 30, 104)";
    deleteTask.style.borderRadius = "50%";
    deleteTask.style.cursor = "pointer";

    // eventlistener for delete bn

    deleteTask.addEventListener("click", function(){
        task.remove();

        //saving changes to local storage after deleting any task

        localTask.forEach( function(value, index){
            if(value.id == ElementObj.id){
                localTask.splice(index,1);
            }    
        })
        saveToLocalStorage(localTask);
    })
    task.appendChild(deleteTask); 


}

var textArea = document.getElementById("task_ip");

// eventlisner for enter into the text area

textArea.addEventListener("keyup", function (event) {
    var textValue = textArea.value.trim();
    if (event.key === "Enter" && textValue !== "") {
        newTask();
    }
    else if ( event.key === "Enter" && textValue === ""){
        alert("task is empty!");
    }
});

// object creating  for new tak
function newTask() {
    const textArea = document.getElementById("task_ip");
    const taskName = textArea.value;

    let localTask = localStorage.getItem("tasks");
    if (localTask) {
        localTask = JSON.parse(localTask);
    } else {
        localTask = [];
    }

    const newTask = {
        name: taskName,
        id: Date.now(),
        check: false
    }

    localTask.push(newTask);
    saveToLocalStorage(localTask);
    createTask(newTask);
    textArea.value = "";
}















