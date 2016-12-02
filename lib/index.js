 /*jshint esversion: 6 */
var taskArray = [];
var completedArray = [];
var sortedArray = [];
var $title = $('#title');
var $task = $('#task');
var sortOrder = false;
var qualityChangers = {
  up: {Critical: "Critical", High: "Critical", Normal: "High", Low: "Normal", None: "Low"},
  down: {Critical: "High", High: "Normal", Normal: "Low", Low: "None", None: "None"}
};

$('document').ready( function() {
  loadPage();
});

$("#title, #task").keyup(function(){
  checkField();
});

$('#task').keyup(function () {
  var max = 120;
  var length = $(this).val().length;
  if (length >= max) {
    $('#char-num').text(' you have reached the 120 character limit');
  } else {
    var char = max - length;
    $('#char-num').text(char + ' characters left');
  }
});

$('#save').on('click', function(e){
  var title = $title.val();
  var task = $task.val();
  var todo = new Task(title, task);
  storeTask(todo);
  createCard(todo);
  $title.val("");
  $task.val("");
  $title.focus();
});

$('#sort').on('click', function(e) {
  if (!sortOrder) {
    render(downSort());
    sortOrder = !sortOrder;
  } else {
    render(upSort());
    sortOrder = !sortOrder;
  }
});

$('#search').on('keyup', function(e) {
  var searchText = e.target.value.toLowerCase();
  var matches = taskArray.filter(function(task) {
    return task.body.toLowerCase().includes(searchText) || task.title.toLowerCase().includes(searchText);
  });
  if (matches) return render(matches);
  return render();
});

$("#todos").on("click", ".delete-btn", function(){
  $(this).closest("article").remove();
  var id = this.closest("article").id;
  deleteTask(id);
});

$("#todos").on('click', ".up-btn", function(){
  var id = +$(this).closest("article").attr('id');
  var currentTask = findTaskByID(id);
  var taskQuality = currentTask.quality;
  taskArray.forEach(function(task) {
    if (task.id === id) {
      task.quality = qualityChangers.up[taskQuality];
    }
  });
  $(this).siblings("h2").text("quality: "+qualityChangers.up[taskQuality]);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
});

$("#todos").on('click', ".down-btn", function(){
  var id = +$(this).closest("article").attr('id');
  var currentTask = findTaskByID(id);
  var taskQuality = currentTask.quality;
  taskArray.forEach(function(task) {
    if (task.id === id) {
      task.quality = qualityChangers.down[taskQuality];
    }
  });
  $(this).siblings("h2").text("quality: "+qualityChangers.down[taskQuality]);
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
});

$("#todos").on('click', ".completed-btn", function(){
  var id = +$(this).closest("article").attr('id');
  var currentTask = findTaskByID(id);
  var taskComplete = currentTask.completed;
  if (taskComplete === false){
    $(this).closest("article").css("background-color", "gray");
    taskArray.forEach(function(task) {
      if (task.id === id) {
        task.completed = true;
      }
    });
  localStorage.setItem("taskArray", JSON.stringify(taskArray));
  } else {
    $(this).closest("article").css("background-color", "white");
    taskArray.forEach(function(task) {
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
    var id = +$(this).closest("article").attr('id');
    var currentTask = findTaskByID(id);
    var newTitle = $(this).text();
    taskArray.forEach(function(task) {
      if (task.id === id) {
          task.title = newTitle;
      }
    });
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    // render();
  }
});

$('#todos').on('keyup blur', ".task-body", function(e) {
  if (e.which == 13 || e.type === "focusout") {
    e.preventDefault();
    var id = +$(this).closest("article").attr('id');
    var currentTask = findTaskByID(id);
    var newBody = $(this).text();
    taskArray.forEach(function(task) {
      if (task.id === id) {
          task.body = newBody;
      }
    });
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    // render();
  }
});

$('#showall').on('click', function(e){
  render();
});

function loadPage() {
  var holdingValue = JSON.parse(localStorage.getItem("taskArray"));
  if (holdingValue){
    taskArray = holdingValue;
    render(taskArray, 10);
  }
}

function render(givenArray, cardsToRender) {
  var renderArray = givenArray || taskArray;
  var cards = cardsToRender || renderArray.length;
  $('#todos').empty();
  for (var i = renderArray.length - cards; i < renderArray.length; i++) {
  createCard(renderArray[i]);
  }
}

function checkField() {
  var checkTitle = /\S/.test($("#title").val());
  var checkBody = /\S/.test($("#task").val());
  var taskLength = $('#task').val().length;
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
  for (var i = 0; i < taskArray.length; i++) {
    var taskId = taskArray[i].id;
    if (id == taskId) taskArray.splice(i, 1);
    localStorage.setItem("taskArray",JSON.stringify(taskArray));
  }
}

function createCard(task) {
  $('#todos').prepend(`<article class="new-task" id=${task.id}>
    <div class = "card-top">
      <h1 class="task-title" contenteditable>${task.title}</h1>
      <button class="delete-btn"></button>
    </div>
    <div class = "card-middle">
      <p class="task-body" contenteditable>${task.body}</p>
    </div>
    <div class = "card-bottom">
      <button class="up-btn"></button>
      <button class="down-btn"></button>
      <h2 class="quality">quality: ${task.quality}</h2>
      <button class="completed-btn">completed</button>
    </div>
  </article>`);
}

function findTaskByID(id) {
  return taskArray.filter(function(task) {
    return task.id === id;
  })[0];
}

function upSort() {
  return taskArray.sort(function(a, b) { return a.quality > b.quality })
}

function downSort() {
  return taskArray.sort(function(a, b) { return a.quality < b.quality });
}

module.exports = index;
