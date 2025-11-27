package com.lms.service.impl;

import com.lms.dto.QuizAttemptRequest;
import com.lms.model.Question;
import com.lms.model.Quiz;
import com.lms.model.QuizResult;
import com.lms.repository.QuestionRepository;
import com.lms.repository.QuizRepository;
import com.lms.repository.QuizResultRepository;
import com.lms.service.QuizService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;

    // Constructor injection
    public QuizServiceImpl(
            QuizRepository quizRepository,
            QuestionRepository questionRepository,
            QuizResultRepository quizResultRepository) {

        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.quizResultRepository = quizResultRepository;
    }

    @Override
    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public List<Quiz> getByCourse(Long courseId) {
        return quizRepository.findByCourseId(courseId);
    }

    @Override
    public QuizResult attemptQuiz(QuizAttemptRequest attempt) {

        List<Question> questions = questionRepository.findByQuizId(attempt.getQuizId());
        Map<Long, String> submittedAnswers = attempt.getAnswers();

        int score = 0;

        for (Question q : questions) {
            String chosen = submittedAnswers.get(q.getId());
            if (chosen != null && chosen.equalsIgnoreCase(q.getCorrectOption())) {
                score++;
            }
        }

        QuizResult result = new QuizResult();
        result.setStudentId(attempt.getStudentId());
        result.setQuizId(attempt.getQuizId());
        result.setScore(score);

        return quizResultRepository.save(result);
    }

    @Override
    public List<QuizResult> getResultsByStudent(Long studentId) {
        return quizResultRepository.findByStudentId(studentId);
    }
}
