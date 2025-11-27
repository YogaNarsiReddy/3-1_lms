package com.lms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "course_content")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long courseId;
    private String title;
    private String type;  // VIDEO / PDF
    private String contentUrl;

    public Content() {}

    public Content(Long id, Long courseId, String title, String type, String contentUrl) {
        this.id = id;
        this.courseId = courseId;
        this.title = title;
        this.type = type;
        this.contentUrl = contentUrl;
    }

    // Getters & setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getContentUrl() { return contentUrl; }
    public void setContentUrl(String contentUrl) { this.contentUrl = contentUrl; }
}
