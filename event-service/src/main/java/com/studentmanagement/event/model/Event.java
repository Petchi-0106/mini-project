package com.studentmanagement.event.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    private String id;
    private String studentName;
    private String studentRollNumber;
    private String eventName;
    private String eventLocation;
    private LocalDate eventDate;
    private String eventDescription;
    private String facultyId;
}
