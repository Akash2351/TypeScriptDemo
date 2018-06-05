import {Todo, TodoState} from "./Model";

export interface ITodoService {
    add(todo: Todo): Todo;
    add(todo: string): Todo;
    add(any): Todo;
    clearCompleted(): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
    toggle(todoId: number): void;
}


export class TodoService implements ITodoService{

    private static _lastId = 0;

    private static generateTodoId() {
        return TodoService._lastId += 1;
    }

    private static clone<T>(src: T): T {
        var clone = JSON.stringify(src);
        return JSON.parse(clone);
    };

    private todos: Todo[] = [];

    constructor(todos: (any | string[] | Todo[])) {

        if (todos) {
            todos.forEach(todo => this.add(todo));
        }
    }

    add(todo: (string|Todo)): Todo
    add(input): Todo {

        var todo = {
            id: TodoService.generateTodoId(),
            name: null,
            state: TodoState.Active
        };

        if (typeof input === 'string') {
            todo.name = input;
        }
        else if (typeof input.name === 'string') {
            todo.name = input.name;
        } else {
            throw 'Invalid Todo name!';
        }

        this.todos.push(todo);

        return todo;
    };


    clearCompleted(): void {
        this.todos = this.todos.filter(x => x.state === TodoState.Active);
    }


    getAll(): Todo [] {
        return TodoService.clone(this.todos);
    };


    getById(todoId: number): Todo {
        var todo = this._find(todoId);
        return TodoService.clone(todo);
    };

    toggle(todoId: number): void {

        var todo = this._find(todoId);

        if (!todo) return;

        switch (todo.state) {
            case TodoState.Active:
                todo.state = TodoState.Complete;
                break;
            case TodoState.Complete:
                todo.state = TodoState.Active;
                break;
        }
    }

    _find(todoId: number): Todo {
        var filtered = this.todos.filter(x => x.id === todoId);

        if (filtered.length) {
            return filtered[0];
        }

        return null;
    }
}