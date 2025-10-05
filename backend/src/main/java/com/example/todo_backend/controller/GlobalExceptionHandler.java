package com.example.todo_backend.controller;


import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ErrorResponse errorResponse = new ErrorResponse(
                "VALIDATION_ERROR",
                "Invalid input data",
                errors,
                LocalDateTime.now()
        );

        return ResponseEntity.badRequest().body(errorResponse);
    }

    // Handle entity not found
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                "NOT_FOUND",
                ex.getMessage(),
                null,
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    // Handle general exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                "INTERNAL_ERROR",
                "An unexpected error occurred",
                null,
                LocalDateTime.now()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}

// Error response class
class ErrorResponse {
    private String code;
    private String message;
    private Map<String, String> details;
    private LocalDateTime timestamp;

    public ErrorResponse(String code, String message, Map<String, String> details, LocalDateTime timestamp) {
        this.code = code;
        this.message = message;
        this.details = details;
        this.timestamp = timestamp;
    }

    // Getters
    public String getCode() { return code; }
    public String getMessage() { return message; }
    public Map<String, String> getDetails() { return details; }
    public LocalDateTime getTimestamp() { return timestamp; }

    // Setters
    public void setCode(String code) { this.code = code; }
    public void setMessage(String message) { this.message = message; }
    public void setDetails(Map<String, String> details) { this.details = details; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}