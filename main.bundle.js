/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	/*jshint esversion: 6 */
	var $title = $('#title');
	var $task = $('#task');
	var qualityChangers = {
	  up: { Critical: "Critical", High: "Critical", Normal: "High", Low: "Normal", None: "Low" },
	  down: { Critical: "High", High: "Normal", Normal: "Low", Low: "None", None: "None" }
	};
	var taskArray = [];

	$('document').ready(function () {
	  loadPage();
	  pageLoadRender();
	});

	$("#title, #task").keyup(function () {
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

	$('#save').on('click', function (e) {
	  var title = $title.val();
	  var task = $task.val();
	  var todo = new Task(title, task);
	  storeTask(todo);
	  createCard(todo);
	  $title.val("");
	  $task.val("");
	  $title.focus();
	});

	$('.quality-button').on('click', function () {
	  var id = this.id;
	  var matches = taskArray.filter(function (task) {
	    return task.quality.toLowerCase().includes(id);
	  });
	  if (matches) return render(matches);
	});

	$('#show-completed').on('click', function () {
	  showCompleted();
	});

	$('#search').on('keyup', function (e) {
	  var searchText = e.target.value.toLowerCase();
	  var matches = taskArray.filter(function (task) {
	    return task.body.toLowerCase().includes(searchText) || task.title.toLowerCase().includes(searchText);
	  });
	  if (matches) return render(matches);
	  return render();
	});

	$("#todos").on("click", ".delete-btn", function () {
	  $(this).closest("article").remove();
	  var id = this.closest("article").id;
	  deleteTask(id);
	});

	$("#todos").on('click', ".up-btn", function () {
	  var id = +$(this).closest("article").attr('id');
	  var currentTask = findTaskByID(id);
	  var taskQuality = currentTask.quality;
	  taskArray.forEach(function (task) {
	    if (task.id === id) {
	      task.quality = qualityChangers.up[taskQuality];
	    }
	  });
	  $(this).siblings("h2").text("quality: " + qualityChangers.up[taskQuality]);
	  localStorage.setItem("taskArray", JSON.stringify(taskArray));
	});

	$("#todos").on('click', ".down-btn", function () {
	  var id = +$(this).closest("article").attr('id');
	  var currentTask = findTaskByID(id);
	  var taskQuality = currentTask.quality;
	  taskArray.forEach(function (task) {
	    if (task.id === id) {
	      task.quality = qualityChangers.down[taskQuality];
	    }
	  });
	  $(this).siblings("h2").text("quality: " + qualityChangers.down[taskQuality]);
	  localStorage.setItem("taskArray", JSON.stringify(taskArray));
	});

	$("#todos").on('click', ".completed-btn", function () {
	  var id = +$(this).closest("article").attr('id');
	  var currentTask = findTaskByID(id);
	  var taskComplete = currentTask.completed;
	  if (taskComplete === false) {
	    $(this).closest("article").toggleClass("completed");
	    taskArray.forEach(function (task) {
	      if (task.id === id) {
	        task.completed = true;
	      }
	    });
	    localStorage.setItem("taskArray", JSON.stringify(taskArray));
	  } else {
	    $(this).closest("article").toggleClass("completed");
	    taskArray.forEach(function (task) {
	      if (task.id === id) {
	        task.completed = false;
	      }
	    });
	    localStorage.setItem("taskArray", JSON.stringify(taskArray));
	  }
	});

	$('#todos').on('keyup blur', ".task-title", function (e) {
	  var _this = this;

	  if (e.which == 13 || e.type === "focusout") {
	    (function () {
	      e.preventDefault();
	      var id = +$(_this).closest("article").attr('id');
	      var currentTask = findTaskByID(id);
	      var newTitle = $(_this).text();
	      taskArray.forEach(function (task) {
	        if (task.id === id) {
	          task.title = newTitle;
	        }
	      });
	      localStorage.setItem("taskArray", JSON.stringify(taskArray));
	    })();
	  }
	});

	$('#todos').on('keyup blur', ".task-body", function (e) {
	  var _this2 = this;

	  if (e.which == 13 || e.type === "focusout") {
	    (function () {
	      e.preventDefault();
	      var id = +$(_this2).closest("article").attr('id');
	      var currentTask = findTaskByID(id);
	      var newBody = $(_this2).text();
	      taskArray.forEach(function (task) {
	        if (task.id === id) {
	          task.body = newBody;
	        }
	      });
	      localStorage.setItem("taskArray", JSON.stringify(taskArray));
	    })();
	  }
	});

	$('#showall').on('click', function (e) {
	  render();
	});

	function loadPage() {
	  var holdingValue = JSON.parse(localStorage.getItem("taskArray"));
	  if (holdingValue) {
	    taskArray = holdingValue;
	  }
	}

	function pageLoadRender() {
	  var completedArray = [];
	  for (var i = 0; i < taskArray.length; i++) {
	    var task = taskArray[i];
	    if (!task.completed) {
	      completedArray.push(task);
	    }
	    render(completedArray);
	  }
	}

	function showCompleted() {
	  var completedArray = [];
	  for (var i = 0; i < taskArray.length; i++) {
	    var task = taskArray[i];
	    if (!task.completed) {
	      completedArray.push(task);
	    }
	  }
	  for (var _i = 0; _i < taskArray.length; _i++) {
	    var _task = taskArray[_i];
	    if (_task.completed) {
	      completedArray.push(_task);
	    }
	  }
	  render(completedArray);
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
	  if (checkTitle && checkBody && taskLength < 120) {
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

	function storeTask(task) {
	  taskArray.push(task);
	  localStorage.setItem("taskArray", JSON.stringify(taskArray));
	}

	function deleteTask(id) {
	  for (var i = 0; i < taskArray.length; i++) {
	    var taskId = taskArray[i].id;
	    if (id == taskId) taskArray.splice(i, 1);
	    localStorage.setItem("taskArray", JSON.stringify(taskArray));
	  }
	}

	function createCard(task) {
	  if (task.completed === true) {
	    $('#todos').prepend('<article class="new-task completed" id=' + task.id + '>\n     <div class = "card-top">\n       <h1 class="task-title" name="task-title" contenteditable>' + task.title + '</h1>\n       <button type="button" class="delete-btn" value="delete task"><p class=\'card-btn-text\'>Delete Task Button</p></button>\n     </div>\n     <div class = "card-middle">\n       <p class="task-body" name="task-body" contenteditable>' + task.body + '</p>\n     </div>\n     <div class = "card-bottom">\n       <button type="button" class="up-btn" value="increase importance button" name="up-button"><p class=\'card-btn-text\'>Increase Importance Button</p></button>\n       <button type="button" class="down-btn" name="down-button" value="decrease importance button"><p class=\'card-btn-text\'>Decrease Importance Button</p></button>\n       <h2 class="quality" name="quality">quality: ' + task.quality + '</h2>\n\n       <button class="completed-btn" value="mark as completed button">completed</button>\n     </div>\n   </article>');
	  } else {
	    $('#todos').prepend('<article class="new-task" id=' + task.id + '>\n    <div class = "card-top">\n      <h1 class="task-title" name="task-title" contenteditable>' + task.title + '</h1>\n      <button type="button" class="delete-btn" value="delete task"><p class=\'card-btn-text\'>Delete Task Button</p></button>\n    </div>\n    <div class = "card-middle">\n      <p class="task-body" name="task-body" contenteditable>' + task.body + '</p>\n    </div>\n    <div class = "card-bottom">\n      <button type="button" class="up-btn" value="increase importance button" name="up-button"><p class=\'card-btn-text\'>Increase Importance Button</p></button>\n      <button type="button" class="down-btn" name="down-button" value="decrease importance button"><p class=\'card-btn-text\'>Decrease Importance Button</p></button>\n      <h2 class="quality" name="quality">quality: ' + task.quality + '</h2>\n      <button class="completed-btn" value="mark as completed button">completed</button>\n    </div>\n  </article>');
	  }
	}

	function findTaskByID(id) {
	  return taskArray.filter(function (task) {
	    return task.id === id;
	  })[0];
	}

/***/ }
/******/ ]);