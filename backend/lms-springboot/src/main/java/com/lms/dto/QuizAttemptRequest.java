package com.lms.dto;

import lombok.Data;
import java.util.Map;

@Data
public class QuizAttemptRequest {

    private Long studentId;
    private Long quizId;

    // key = questionId, value = chosen option
    private Map<Long, String> answers;

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public Long getQuizId() {
		return quizId;
	}

	public void setQuizId(Long quizId) {
		this.quizId = quizId;
	}

	public Map<Long, String> getAnswers() {
		return answers;
	}

	public void setAnswers(Map<Long, String> answers) {
		this.answers = answers;
	}
}
