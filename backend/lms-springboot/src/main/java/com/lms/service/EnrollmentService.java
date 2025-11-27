package com.lms.service;

import com.lms.model.Enrollment;

import java.util.List;

public interface EnrollmentService {
    Enrollment enroll(Long studentId, Long courseId);
    List<Enrollment> getByStudent(Long studentId);
    List<Enrollment> getByCourse(Long courseId);
}
