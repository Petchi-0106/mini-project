package com.studentmanagement.student.repository;

import com.studentmanagement.student.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EventRepository extends MongoRepository<Event, String> {
    List<Event> findByStudentRollNumber(String rollNumber);
    List<Event> findByFacultyId(String facultyId);
}
