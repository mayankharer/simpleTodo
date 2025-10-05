package com.example.todo_backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //makes this class a REST API controller
@RequestMapping("/api") //All APIs start with /api
public class TestController {
    @GetMapping("/health") // Maps GET requests to /api/health
    public ResponseEntity<String> healthCheck(){ //Allows us to control the HTTP status codes
        return ResponseEntity.ok("Backend is running! 🚀");
    }

    @GetMapping("/test")
    public ResponseEntity<TestResponse> test(){
        TestResponse response = new TestResponse(
                "Hello from Spring Boot!",
                "Todo API is ready",
                System.currentTimeMillis()
        );
        return ResponseEntity.ok(response);
    }
}

class TestResponse{
    private String message;
    private String description;
    private Long timeStamp;

    public TestResponse(String message,String description,Long timeStamp){
        this.message = message;
        this.description = description;
        this.timeStamp = timeStamp;
    }

    public String getMessage() {return message;}
    public String getDescription() {return description;}
    public Long getTimeStamp() {return timeStamp;}

    public void setMessage(String message) {this.message = message;}
    public void setDescription(String description) {this.description = description;}
    public void setTimeStamp(Long timeStamp) {this.timeStamp = timeStamp;}

}