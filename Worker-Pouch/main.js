        (function() {
            var db;
            workerPouch.isSupportedBrowser().then(function(supported) {
                if (supported) {
                    db = new PouchDB('workers', {
                        adapter: 'worker'
                    });
                }
                else { // fall back to a normal PouchDB
                    db = new PouchDB('workers');
                }
            }).catch(console.log.bind(console)); // shouldn't throw an error

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
                        var id = Date.now().toString();
                        var todo = userInput;
                        db.put({
                            _id: id,
                            todo: todo
                        }).then(function(response) {
                            // handle response
                            var taskItem = doc.createElement("li");

                            taskItem.innerHTML = todo + '<button class="del" id="' + response.id + '">Delete</button>';

                            listWrapper.appendChild(taskItem);

                            doc.getElementById("task-input").value = "";

                            loadRemoveOptions();


                            if (allItems.length) {
                                notification.add("hidden");
                            }

                        }).catch(function(err) {
                            // handle error
                            console.log(data.response)
                        });
                    }

                },
                loadRemoveOptions = function() {

                    for (var i = 0, l = allItems.length; i < l; i++) {
                        allDelButtons[i].addEventListener("click", removeTask, false);
                    }

                },
                removeTask = function() {
                    var elem = this;
                    db.get(elem.id).then(function(doc) {
                        return db.remove(doc._id, doc._rev);
                    }).then(function(result) {
                        var taskToDelete = elem.parentNode,
                            confirmRemoval = confirm("This action is irreversible. Are you sure you want to delete this goal?");

                        if (confirmRemoval) {
                            taskToDelete.outerHTML = "";
                        }
                        if (!allItems.length) {
                            notification.remove("hidden");
                        }

                    }).catch(function(err) {
                        // console.log(err);
                        console.log(err);
                    });
                };
            loadRemoveOptions();
            addButton.addEventListener("click", addTask, false);

        }());