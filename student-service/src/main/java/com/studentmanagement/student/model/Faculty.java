package com.studentmanagement.student.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "faculties")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Faculty {
    @Id
    private String id;
    private String facultyId;
    private String facultyName;
    private String email;
    private String password;
}
