package com.studentmanagement.student.controller;

import com.studentmanagement.student.model.Student;
import com.studentmanagement.student.model.Event;
import com.studentmanagement.student.repository.EventRepository;
import com.studentmanagement.student.repository.StudentRepository;
import com.studentmanagement.student.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Student student) {
        if (studentRepository.findByEmail(student.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use!");
        }
        if (studentRepository.findByRollNumber(student.getRollNumber()).isPresent()) {
            return ResponseEntity.badRequest().body("Roll Number is already in use!");
        }
        student.setEmail(student.getEmail().toLowerCase());
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepository.save(student);
        return ResponseEntity.ok("Student registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("rollNumber"); // From frontend "Username or Email"
        String password = loginRequest.get("password");

        // Try to find by Roll Number first, then by Email
        String loginInput = username.trim();
        Optional<Student> studentOptional = studentRepository.findByRollNumber(loginInput);
        if (studentOptional.isEmpty()) {
            studentOptional = studentRepository.findByEmail(loginInput.toLowerCase());
        }

        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            if (passwordEncoder.matches(password, student.getPassword())) {
                String token = jwtUtils.generateToken(student.getRollNumber());
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("rollNumber", student.getRollNumber());
                response.put("name", student.getStudentName());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @GetMapping("/events/{rollNumber}")
    public ResponseEntity<?> getStudentEvents(@PathVariable String rollNumber) {
        // Direct local access now that services are unified
        try {
            List<Event> response = eventRepository.findByStudentRollNumber(rollNumber);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving student events");
        }
    }
}
