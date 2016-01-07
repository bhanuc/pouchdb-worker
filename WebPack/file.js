// import * from "../node_modules/pouchdb/dist/pouchdb.js";
var PouchDB = require('../node_modules/pouchdb/dist/pouchdb.js');
var db = new PouchDB('workers');

onmessage = function(dbEvent) {
    var data = dbEvent.data;
    switch (data.msg) {
        case 'CREATE':
            var id = Date.now().toString();
            var todo = data.todo;
            db.put({
                _id: id,
                todo: todo
            }).then(function(response) {
                // handle response
                postMessage({
                    'msg': 'CREATE',
                    response: response,
                    todo: todo
                });
            }).catch(function(err) {
                postMessage({
                    'msg': 'ERROR',
                    response: err
                });
            });
            break;
        case 'DELETE':
            var id = data.id;
            db.get(id).then(function(doc) {
                return db.remove(doc._id, doc._rev);
            }).then(function(result) {
                postMessage({
                    'msg': 'DELETE',
                    id: id
                });
            }).catch(function(err) {
                // console.log(err);
                postMessage({
                    'msg': 'ERROR',
                    response: err
                });
            });
            break;
        default:
            // code
    }
};