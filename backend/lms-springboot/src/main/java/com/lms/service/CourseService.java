package com.lms.service;

import com.lms.model.Course;

import java.util.List;

public interface CourseService {
    Course addCourse(Course course);
    List<Course> getAllCourses();
    Course updateCourse(Long id, Course course);
    void deleteCourse(Long id);
    Course getById(Long id);
}
