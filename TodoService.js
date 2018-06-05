System.register(["./Model"], function (exports_1, context_1) {
    "use strict";
    var Model_1, TodoService;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (Model_1_1) {
                Model_1 = Model_1_1;
            }
        ],
        execute: function () {
            TodoService = /** @class */ (function () {
                function TodoService(todos) {
                    var _this = this;
                    this.todos = [];
                    if (todos) {
                        todos.forEach(function (todo) { return _this.add(todo); });
                    }
                }
                TodoService.generateTodoId = function () {
                    return TodoService._lastId += 1;
                };
                TodoService.clone = function (src) {
                    var clone = JSON.stringify(src);
                    return JSON.parse(clone);
                };
                ;
                TodoService.prototype.add = function (input) {
                    var todo = {
                        id: TodoService.generateTodoId(),
                        name: null,
                        state: Model_1.TodoState.Active
                    };
                    if (typeof input === 'string') {
                        todo.name = input;
                    }
                    else if (typeof input.name === 'string') {
                        todo.name = input.name;
                    }
                    else {
                        throw 'Invalid Todo name!';
                    }
                    this.todos.push(todo);
                    return todo;
                };
                ;
                TodoService.prototype.clearCompleted = function () {
                    this.todos = this.todos.filter(function (x) { return x.state === Model_1.TodoState.Active; });
                };
                TodoService.prototype.getAll = function () {
                    return TodoService.clone(this.todos);
                };
                ;
                TodoService.prototype.getById = function (todoId) {
                    var todo = this._find(todoId);
                    return TodoService.clone(todo);
                };
                ;
                TodoService.prototype.toggle = function (todoId) {
                    var todo = this._find(todoId);
                    if (!todo)
                        return;
                    switch (todo.state) {
                        case Model_1.TodoState.Active:
                            todo.state = Model_1.TodoState.Complete;
                            break;
                        case Model_1.TodoState.Complete:
                            todo.state = Model_1.TodoState.Active;
                            break;
                    }
                };
                TodoService.prototype._find = function (todoId) {
                    var filtered = this.todos.filter(function (x) { return x.id === todoId; });
                    if (filtered.length) {
                        return filtered[0];
                    }
                    return null;
                };
                TodoService._lastId = 0;
                return TodoService;
            }());
            exports_1("TodoService", TodoService);
        }
    };
});
