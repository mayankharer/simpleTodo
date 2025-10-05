package com.example.todo_backend.repository;

import com.example.todo_backend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Long> {
    // Spring Data JPA automatically provides:
    // - findAll() - get all todos
    // - findById(Long id) - get todo by ID
    // - save(Todo todo) - create or update todo
    // - deleteById(Long id) - delete todo by ID
    // - existsById(Long id) - check if todo exists

    // Custom query methods - Spring Data JPA creates implementations automatically
    // Find todos by completion status
    List<Todo> findByCompleted(Boolean completed);
    // Find todos containing text in title (case-insensitive)
    List<Todo> findByTitleContainingIgnoreCase(String title);
    // Find todos by title and completion status
    List<Todo> findByTitleContainingIgnoreCaseAndCompleted(String title, Boolean completed);
    Long countByCompleted(Boolean completed); // NO @Query

//    // Custom JPQL query - count completed todos
//    @Query("SELECT COUNT(t) FROM Todo y WHERE t.completed = :completed")
//    Long countByCompleted(@Param("completed") Boolean completed);
//
//    // Custom JPQL query - find recent todos {created in last N days}
//    @Query("SELECT t FROM Todo t WHERE t.createdAt > CURRENT_TIMESTAMP - :days DAY ORDER BY t.createdAt DESC")
//    List<Todo> findRecentTodos(@Param("days") int days);
//
//    // Custom native SQL query example (if needed for complex queries)
//    @Query(value = "SELECT * FROM todos WHERE UPPER(title) LIKE UPPER(CONCAT('%', :keyword, '%')) ORDER BY created_at DESC",  nativeQuery = true)
//    List<Todo> searchTodosByKeyword(@Param("keyword") String keyword);
}
