package com.studentmanagement.student.repository;

import com.studentmanagement.student.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findByRollNumber(String rollNumber);
    Optional<Student> findByEmail(String email);
}
