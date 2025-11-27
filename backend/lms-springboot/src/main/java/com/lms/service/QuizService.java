package com.lms.service;

import com.lms.dto.QuizAttemptRequest;
import com.lms.model.Quiz;
import com.lms.model.QuizResult;

import java.util.List;

public interface QuizService {
    Quiz createQuiz(Quiz quiz);
    List<Quiz> getByCourse(Long courseId);
    QuizResult attemptQuiz(QuizAttemptRequest attempt);
    List<QuizResult> getResultsByStudent(Long studentId);
}
