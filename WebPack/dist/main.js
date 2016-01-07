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
/***/ function(module, exports, __webpack_require__) {

	// main.js

	var MyWorker = __webpack_require__(1);

	var PouchWorker = new MyWorker();
	var doc = document,
	    notification = doc.getElementById("notice").classList,
	    addButton = doc.getElementById("add"),
	    listWrapper = doc.getElementById("todo"),
	    allItems = doc.getElementsByTagName("li"),
	    allDelButtons = listWrapper.getElementsByTagName("button"),
	    addTask = function() {

	        var userInput = doc.getElementById("task-input").value;

	        if (!userInput.length) {

	            alert("You need to enter a goal first.");

	        }
	        else {
	            PouchWorker.postMessage({
	                "msg": "CREATE",
	                "todo": userInput
	            });
	        }

	    },
	    loadRemoveOptions = function() {

	        for (var i = 0, l = allItems.length; i < l; i++) {
	            allDelButtons[i].addEventListener("click", removeTask, false);
	        }

	    },
	    removeTask = function() {
	        var id = this.id;
	        PouchWorker.postMessage({
	            "msg": "DELETE",
	            "id": id
	        });
	    };
	loadRemoveOptions();
	addButton.addEventListener("click", addTask, false);


	PouchWorker.onmessage = function(dbEvent) {
	        var data = dbEvent.data;
	        switch (data.msg) {
	            case 'CREATE':
	                var taskItem = doc.createElement("li");

	                taskItem.innerHTML = data.todo + '<button class="del" id="' + data.response.id + '">Delete</button>';

	                listWrapper.appendChild(taskItem);

	                doc.getElementById("task-input").value = "";

	                loadRemoveOptions();


	                if (allItems.length) {
	                    notification.add("hidden");
	                }

	                break;
	            case 'DELETE':
	                var element = document.getElementById(data.id)
	                var taskToDelete = element.parentNode,
	                    confirmRemoval = confirm("This action is irreversible. Are you sure you want to delete this goal?");

	                if (confirmRemoval) {
	                    taskToDelete.outerHTML = "";
	                }
	                if (!allItems.length) {
	                    notification.remove("hidden");
	                }
	                break;
	            case 'ERROR':
	                // handle error
	                console.log(data.response)
	                break;
	            default:
	                // code
	        }
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		return new Worker(__webpack_require__.p + "dist/297fdc442e53eeae6876.worker.js");
	};

/***/ }
/******/ ]);