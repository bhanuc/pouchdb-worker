var work = require('webworkify');
var PouchWorker = work(require('./worker.js'));

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