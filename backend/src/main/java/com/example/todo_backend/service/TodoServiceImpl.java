package com.example.todo_backend.service;

import com.example.todo_backend.entity.Todo;
import com.example.todo_backend.repository.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;

    public TodoServiceImpl(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    @Override
    public List<Todo> findAll(){
        return todoRepository.findAll();
    }

    @Override
    public Optional<Todo> findById(Long id){
        return todoRepository.findById(id);
    }

    @Override
    public Todo save(Todo todo){
        return todoRepository.save(todo);
    }

    @Override
    public Todo update(Long id,Todo todo){
        Todo existing = todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Todo not found"));

        existing.setTitle(todo.getTitle());
        existing.setDescription(todo.getDescription());
        existing.setCompleted(todo.getCompleted());
        return todoRepository.save(existing);
    }

    @Override
    public void delete(Long id){
        todoRepository.deleteById(id);
    }

    @Override
    public Todo toggleCompleted(Long id){
        Todo existing = todoRepository.findById(id)
                .orElseThrow(()-> new EntityNotFoundException("Todo not found"));
        existing.setCompleted(!existing.getCompleted());
        return todoRepository.save(existing);
    }





}
