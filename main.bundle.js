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

	var ideaArray = [];
	var sortedArray = [];
	var $title = $('#title');
	var $body = $('#body');
	var sortOrder = false;
	var qualityChangers = {
	  up: { Critical: "Critical", High: "Critical", Normal: "High", Low: "Normal", None: "Low" },
	  down: { Critical: "High", High: "Normal", Normal: "Low", Low: "None", None: "None" }
	};

	$('document').ready(function () {
	  loadPage();
	});

	$("#title, #body").keyup(function () {
	  checkField();
	});

	$('#save').on('click', function (e) {
	  var title = $title.val();
	  var body = $body.val();
	  var idea = new Idea(title, body);
	  storeIdea(idea);
	  createCard(idea);
	  $title.val("");
	  $body.val("");
	});

	$('#sort').on('click', function (e) {
	  if (!sortOrder) {
	    render(downSort());
	    sortOrder = !sortOrder;
	  } else {
	    render(upSort());
	    sortOrder = !sortOrder;
	  }
	});

	$('#search').on('keyup', function (e) {
	  var searchText = e.target.value.toLowerCase();
	  var matches = ideaArray.filter(function (idea) {
	    return idea.body.toLowerCase().includes(searchText) || idea.title.toLowerCase().includes(searchText);
	  });
	  if (matches) return render(matches);
	  return render();
	});

	$("#ideas").on("click", ".delete-btn", function () {
	  $(this).closest("article").remove();
	  var id = this.closest("article").id;
	  deleteIdea(id);
	});

	$("#ideas").on('click', ".up-btn", function () {
	  var id = +$(this).closest("article").attr('id');
	  var currentIdea = findIdeaByID(id);
	  var ideaQuality = currentIdea.quality;
	  ideaArray.forEach(function (idea) {
	    if (idea.id === id) {
	      idea.quality = qualityChangers.up[ideaQuality];
	    }
	  });
	  $(this).siblings("h2").text("quality: " + qualityChangers.up[ideaQuality]);
	  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
	});

	$("#ideas").on('click', ".down-btn", function () {
	  var id = +$(this).closest("article").attr('id');
	  var currentIdea = findIdeaByID(id);
	  var ideaQuality = currentIdea.quality;
	  ideaArray.forEach(function (idea) {
	    if (idea.id === id) {
	      idea.quality = qualityChangers.down[ideaQuality];
	    }
	  });
	  $(this).siblings("h2").text("quality: " + qualityChangers.down[ideaQuality]);
	  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
	});

	$("#ideas").on('click', ".completed-btn", function () {
	  var id = +$(this).closest("article").css("background-color", "gray");
	});

	$('#ideas').on('keyup blur', ".idea-title", function (e) {
	  if (e.which == 13 || e.type === "focusout") {
	    e.preventDefault();
	    var id = +$(this).closest("article").attr('id');
	    var currentIdea = findIdeaByID(id);
	    var newTitle = $(this).text();
	    ideaArray.forEach(function (idea) {
	      if (idea.id === id) {
	        idea.title = newTitle;
	      }
	    });
	    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
	    render();
	  }
	});

	$('#ideas').on('keyup blur', ".idea-body", function (e) {
	  if (e.which == 13 || e.type === "focusout") {
	    e.preventDefault();
	    var id = +$(this).closest("article").attr('id');
	    var currentIdea = findIdeaByID(id);
	    var newBody = $(this).text();
	    ideaArray.forEach(function (idea) {
	      if (idea.id === id) {
	        idea.body = newBody;
	      }
	    });
	    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
	    render();
	  }
	});

	function loadPage() {
	  var holdingValue = JSON.parse(localStorage.getItem("ideaArray"));
	  if (holdingValue) {
	    ideaArray = holdingValue;
	    render(ideaArray);
	  }
	}

	function render(givenArray) {
	  var renderArray = givenArray || ideaArray;
	  $('#ideas').empty();
	  for (var i = 0; i < renderArray.length; i++) {
	    createCard(renderArray[i]);
	  }
	}

	function checkField() {
	  var checkTitle = /\S/.test($("#title").val());
	  var checkBody = /\S/.test($("#body").val());
	  if (checkTitle && checkBody) {
	    $("#save").attr("disabled", false);
	  } else {
	    $("#save").attr("disabled", true);
	  }
	}

	function Idea(title, body) {
	  this.id = new Date().getTime();
	  this.title = title;
	  this.body = body;
	  this.quality = 'Normal';
	}

	function storeIdea(idea) {
	  ideaArray.push(idea);
	  localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
	}

	function deleteIdea(id) {
	  for (var i = 0; i < ideaArray.length; i++) {
	    var ideaId = ideaArray[i].id;
	    if (id == ideaId) ideaArray.splice(i, 1);
	    localStorage.setItem("ideaArray", JSON.stringify(ideaArray));
	  }
	}

	function createCard(idea) {
	  $('#ideas').prepend('<article class="newIdea" id=' + idea.id + '>\n    <div class = "card-top">\n      <h1 class="idea-title" contenteditable>' + idea.title + '</h1>\n      <button class="delete-btn"></button>\n    </div>\n    <div class = "card-middle">\n      <p class="idea-body" contenteditable>' + idea.body + '</p>\n    </div>\n    <div class = "card-bottom">\n      <button class="up-btn"></button>\n      <button class="down-btn"></button>\n      <h2 class="quality">quality: ' + idea.quality + '</h2>\n      <button class="completed-btn">completed</button>\n    </div>\n  </article>');
	}

	function findIdeaByID(id) {
	  return ideaArray.filter(function (idea) {
	    return idea.id === id;
	  })[0];
	}

	function upSort() {
	  return ideaArray.sort(function (a, b) {
	    return a.quality > b.quality;
	  });
	}

	function downSort() {
	  return ideaArray.sort(function (a, b) {
	    return a.quality < b.quality;
	  });
	}

/***/ }
/******/ ]);