package com.lms.controller;

import com.lms.dto.QuizAttemptRequest;
import com.lms.model.Quiz;
import com.lms.model.QuizResult;
import com.lms.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@CrossOrigin
public class QuizController {

    private final QuizService quizService;

    // Manual constructor
    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/create")
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.createQuiz(quiz));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Quiz>> getQuizzesByCourse(@PathVariable Long courseId) {
        return ResponseEntity.ok(quizService.getByCourse(courseId));
    }

    @PostMapping("/attempt")
    public ResponseEntity<?> attemptQuiz(@RequestBody QuizAttemptRequest req) {
        try {
            QuizResult result = quizService.attemptQuiz(req);
            return ResponseEntity.ok(result);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/results/student/{studentId}")
    public ResponseEntity<List<QuizResult>> results(@PathVariable Long studentId) {
        return ResponseEntity.ok(quizService.getResultsByStudent(studentId));
    }
}
