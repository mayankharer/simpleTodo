package com.example.todo_backend.service;
import com.example.todo_backend.entity.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoService {
    List<Todo> findAll();
    Optional<Todo> findById(Long id);
    Todo save(Todo todo);
    Todo update(Long id, Todo todo);
    void delete(Long id);
    Todo toggleCompleted(Long id);
}
