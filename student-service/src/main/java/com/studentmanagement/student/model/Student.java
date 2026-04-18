package com.studentmanagement.student.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    private String id;
    private String studentName;
    private String rollNumber;
    private String email;
    private String password;
}
