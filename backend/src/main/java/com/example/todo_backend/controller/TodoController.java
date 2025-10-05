package com.example.todo_backend.controller;

import com.example.todo_backend.entity.Todo;
import com.example.todo_backend.service.TodoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController //makes this class as a REST API controller
@RequestMapping("/api/todos") // all APIs start with the /api/todos
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = {"${cors.allowed.origins}", "https://localhost:5173"})
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }
    // GET /api/todos - Get all todos
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(){
        List<Todo> todos = todoService.findAll();
        return ResponseEntity.ok(todos);
    }

    // GET /api/todos/{id} -Get todo by id
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id){
        Optional<Todo> todo = todoService.findById(id);
        return todo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // POST /api/todos - Create new todo
    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo) {
        Todo savedTodo = todoService.save(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id,
                                           @Valid @RequestBody Todo todo){
        try {
            Todo updateTodo = todoService.update(id,todo);
            return ResponseEntity.ok(updateTodo);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    // PATCH /api/todos/{id}/toggle - Toggle completion status
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleTodoCompletion(@PathVariable Long id){
        try{
            Todo toggleTodo = todoService.toggleCompleted(id);
            return ResponseEntity.ok(toggleTodo);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id){
        try{
            todoService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET /api/todos/completed
    @GetMapping("/completed")
    public ResponseEntity<List<Todo>> getCompletedTodos(){
        List<Todo> allTodos = todoService.findAll();
        List<Todo> completedTodos = allTodos.stream()
                .filter(Todo::getCompleted)
                .toList();
        return ResponseEntity.ok(completedTodos);
    }

    // GET /api/todos/active (incomplete) todos
    @GetMapping("active")
    public ResponseEntity<List<Todo>> getActiveTodos(){
        List<Todo> allTodos = todoService.findAll();
        List<Todo> activeTodos = allTodos.stream()
                .filter(todo -> !todo.getCompleted())
                .toList();
        return ResponseEntity.ok(activeTodos);
    }

}
