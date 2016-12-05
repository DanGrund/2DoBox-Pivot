 /*jshint esversion: 6 */
const $title = $('#title');
const $task = $('#task');
const qualityChangers = {
  up: {Critical: "Critical", High: "Critical", Normal: "High", Low: "Normal", None: "Low"},
  down: {Critical: "High", High: "Normal", Normal: "Low", Low: "None", None: "None"}
};
let taskArray = [];

$('document').ready(()=> {
  loadPage();
  pageLoadRender();
});

$("#title, #task").keyup(()=>{
  checkField();
});

$('#task').keyup(function () {
  let max = 120;
  let length = $(this).val().length;
  if (length >= max) {
    $('#char-num').text(' you have reached the 120 character limit');
  } else {
    let char = max - length;
    $('#char-num').text(char + ' characters left');
  }
});

$('#save').on('click',(e)=>{
  let title = $title.val();
  let task = $task.val();
  let todo = new Task(title, task);
  storeTask(todo);
  createCard(todo);
  $title.val("");
  $task.val("");
  $title.focus();
});

$('.quality-button').on('click', function(){
  let id = this.id;
  let matches = taskArray.filter((task)=>{
    return task.quality.toLowerCase().includes(id);
  });
  if (matches) return render(matches);
  });

$('#show-completed').on('click', ()=>{
  showCompleted();
});

$('#search').on('keyup',(e)=> {
  let searchText = e.target.value.toLowerCase();
  let matches = taskArray.filter((task)=> {
    return task.body.toLowerCase().includes(searchText) || task.title.toLowerCase().includes(searchText);
  });
  if (matches) return render(matches);
  return render();
});

$("#todos").on("click", ".delete-btn", function(){
  $(this).closest("article").remove();
  let id = this.closest("article").id;
  deleteTask(id);
});

$("#todos").on('click', ".up-btn", function(){
  let id = +$(this).closest("article").attr('id');
  let currentTask = findTaskByID(id);
  let taskQuality = currentTask.quality;
  taskArray.forEach((task)=> {
    if (task.id === id) {
      task.quality = qualityChangers.up[taskQuality];
    }
  });
  $(this).siblings("h2").text("quality: "+qualityChangers.up[taskQuality]);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
});

$("#todos").on('click', ".down-btn", function(){
  let id = +$(this).closest("article").attr('id');
  let currentTask = findTaskByID(id);
  let taskQuality = currentTask.quality;
  taskArray.forEach((task)=> {
    if (task.id === id) {
      task.quality = qualityChangers.down[taskQuality];
    }
  });
  $(this).siblings("h2").text("quality: "+qualityChangers.down[taskQuality]);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
});

$("#todos").on('click', ".completed-btn", function(){
  let id = +$(this).closest("article").attr('id');
  let currentTask = findTaskByID(id);
  let taskComplete = currentTask.completed;
  if (taskComplete === false){
    $(this).closest("article").toggleClass("completed");
    taskArray.forEach((task)=> {
      if (task.id === id) {
        task.completed = true;
      }
    });
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
  } else {
    $(this).closest("article").toggleClass("completed");
    taskArray.forEach((task)=> {
      if (task.id === id) {
        task.completed = false;
      }
    });
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
  }
});

$('#todos').on('keyup blur', ".task-title", function(e) {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    let id = +$(this).closest("article").attr('id');
    let currentTask = findTaskByID(id);
    let newTitle = $(this).text();
    taskArray.forEach((task)=> {
      if (task.id === id) {
          task.title = newTitle;
      }
    });
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
  }
});

$('#todos').on('keyup blur', ".task-body", function(e) {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    let id = +$(this).closest("article").attr('id');
    let currentTask = findTaskByID(id);
    let newBody = $(this).text();
    taskArray.forEach((task)=> {
      if (task.id === id) {
          task.body = newBody;
      }
    });
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
  }
});

$('#showall').on('click',(e)=>{
  render();
});

function loadPage() {
  let holdingValue = JSON.parse(localStorage.getItem("taskArray"));
  if (holdingValue){
    taskArray = holdingValue;
  }
}

function pageLoadRender(){
  let completedArray = [];
  for (let i = 0; i < taskArray.length; i++) {
    let task = taskArray[i];
    if(!task.completed) {
      completedArray.push(task);
    }
  render(completedArray);
  }
}

function showCompleted(){
  let completedArray = [];
  for (let i = 0; i < taskArray.length; i++) {
    let task = taskArray[i];
    if(!task.completed) {
      completedArray.push(task);
    }
  }
  for (let i = 0; i < taskArray.length; i++) {
    let task = taskArray[i];
    if(task.completed) {
      completedArray.push(task);
    }
  }
  render(completedArray);
}

function render(givenArray, cardsToRender) {
  let renderArray = givenArray || taskArray;
  let cards = cardsToRender || renderArray.length;
  $('#todos').empty();
  for (let i = renderArray.length - cards; i < renderArray.length; i++) {
  createCard(renderArray[i]);
  }
}

function checkField() {
  let checkTitle = /\S/.test($("#title").val());
  let checkBody = /\S/.test($("#task").val());
  let taskLength = $('#task').val().length;
  if(checkTitle && checkBody && taskLength < 120){
    $("#save").attr("disabled", false);
  } else {
    $("#save").attr("disabled", true);
  }
}

function Task(title, body) {
  this.id = new Date().getTime();
  this.title = title;
  this.body = body;
  this.quality = 'Normal';
  this.completed = false;
}

function storeTask (task) {
  taskArray.push(task);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

function deleteTask (id) {
  for (let i = 0; i < taskArray.length; i++) {
    let taskId = taskArray[i].id;
    if (id == taskId) taskArray.splice(i, 1);
    localStorage.setItem("taskArray",JSON.stringify(taskArray));
  }
}

function createCard(task) {
 if (task.completed === true){
   $('#todos').prepend(`<article class="new-task completed" id=${task.id}>
     <div class = "card-top">
       <h1 class="task-title" name="task-title" contenteditable>${task.title}</h1>
       <button type="button" class="delete-btn" value="delete task"><p class='card-btn-text'>Delete Task Button</p></button>
     </div>
     <div class = "card-middle">
       <p class="task-body" name="task-body" contenteditable>${task.body}</p>
     </div>
     <div class = "card-bottom">
       <button type="button" class="up-btn" value="increase importance button" name="up-button"><p class='card-btn-text'>Increase Importance Button</p></button>
       <button type="button" class="down-btn" name="down-button" value="decrease importance button"><p class='card-btn-text'>Decrease Importance Button</p></button>
       <h2 class="quality" name="quality">quality: ${task.quality}</h2>

       <button class="completed-btn" value="mark as completed button">completed</button>
     </div>
   </article>`);
 } else {
  $('#todos').prepend(`<article class="new-task" id=${task.id}>
    <div class = "card-top">
      <h1 class="task-title" name="task-title" contenteditable>${task.title}</h1>
      <button type="button" class="delete-btn" value="delete task"><p class='card-btn-text'>Delete Task Button</p></button>
    </div>
    <div class = "card-middle">
      <p class="task-body" name="task-body" contenteditable>${task.body}</p>
    </div>
    <div class = "card-bottom">
      <button type="button" class="up-btn" value="increase importance button" name="up-button"><p class='card-btn-text'>Increase Importance Button</p></button>
      <button type="button" class="down-btn" name="down-button" value="decrease importance button"><p class='card-btn-text'>Decrease Importance Button</p></button>
      <h2 class="quality" name="quality">quality: ${task.quality}</h2>
      <button class="completed-btn" value="mark as completed button">completed</button>
    </div>
  </article>`);
  }
}

function findTaskByID(id) {
  return taskArray.filter(function(task) {
    return task.id === id;
  })[0];
}
