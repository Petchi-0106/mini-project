package com.studentmanagement.event.controller;

import com.studentmanagement.event.model.Event;
import com.studentmanagement.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/faculty/all")
    public List<Event> getMyEvents() {
        String facultyId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return eventRepository.findByFacultyId(facultyId);
    }

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        String facultyId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        event.setFacultyId(facultyId);
        return ResponseEntity.ok(eventRepository.save(event));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @RequestBody Event eventDetails) {
        String currentFacultyId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return eventRepository.findById(id).map(event -> {
            if (!event.getFacultyId().equals(currentFacultyId)) {
                return ResponseEntity.status(403).body("You can only update your own records");
            }
            event.setStudentName(eventDetails.getStudentName());
            event.setStudentRollNumber(eventDetails.getStudentRollNumber());
            event.setEventName(eventDetails.getEventName());
            event.setEventLocation(eventDetails.getEventLocation());
            event.setEventDate(eventDetails.getEventDate());
            event.setEventDescription(eventDetails.getEventDescription());
            return ResponseEntity.ok(eventRepository.save(event));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        String currentFacultyId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return eventRepository.findById(id).map(event -> {
            if (!event.getFacultyId().equals(currentFacultyId)) {
                return ResponseEntity.status(403).body("You can only delete your own records");
            }
            eventRepository.delete(event);
            return ResponseEntity.ok("Deleted successfully");
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/month/{month}")
    public List<Event> getByMonth(@PathVariable int month) {
        String facultyId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return eventRepository.findByFacultyId(facultyId).stream()
                .filter(e -> e.getEventDate().getMonthValue() == month)
                .collect(Collectors.toList());
    }

    @GetMapping("/student/{rollNumber}")
    public List<Event> getByRollNumber(@PathVariable String rollNumber) {
        return eventRepository.findByStudentRollNumber(rollNumber);
    }

    // ── Public endpoints (no JWT required) ──────────────────────────────────

    // Returns all distinct events (for students to browse available events)
    @GetMapping("/public/all")
    public List<Event> getAllPublicEvents() {
        return eventRepository.findAll();
    }

    // Student self-registration: creates a participation record linked to this event
    @PostMapping("/public/register")
    public ResponseEntity<Event> studentRegister(@RequestBody Event registration) {
        // facultyId is set to "STUDENT_SELF" to mark self-registrations
        if (registration.getFacultyId() == null || registration.getFacultyId().isBlank()) {
            registration.setFacultyId("STUDENT_SELF");
        }
        return ResponseEntity.ok(eventRepository.save(registration));
    }
}

