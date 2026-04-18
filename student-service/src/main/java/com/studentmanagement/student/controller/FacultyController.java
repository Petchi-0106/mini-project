package com.studentmanagement.student.controller;

import com.studentmanagement.student.model.Faculty;
import com.studentmanagement.student.repository.FacultyRepository;
import com.studentmanagement.student.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Faculty faculty) {
        if (facultyRepository.findByEmail(faculty.getEmail().toLowerCase()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use!");
        }
        if (facultyRepository.findByFacultyId(faculty.getFacultyId()).isPresent()) {
            return ResponseEntity.badRequest().body("Faculty ID is already in use!");
        }
        faculty.setEmail(faculty.getEmail().toLowerCase());
        faculty.setPassword(passwordEncoder.encode(faculty.getPassword()));
        facultyRepository.save(faculty);
        return ResponseEntity.ok("Faculty registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("facultyId"); // From frontend "Username or Email"
        String password = loginRequest.get("password");

        // Try to find by Faculty ID first, then by Email
        String loginInput = username.trim();
        Optional<Faculty> facultyOptional = facultyRepository.findByFacultyId(loginInput);
        if (facultyOptional.isEmpty()) {
            facultyOptional = facultyRepository.findByEmail(loginInput.toLowerCase());
        }

        if (facultyOptional.isPresent()) {
            Faculty faculty = facultyOptional.get();
            if (passwordEncoder.matches(password, faculty.getPassword())) {
                String token = jwtUtils.generateToken(faculty.getFacultyId());
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("facultyId", faculty.getFacultyId());
                response.put("name", faculty.getFacultyName());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
