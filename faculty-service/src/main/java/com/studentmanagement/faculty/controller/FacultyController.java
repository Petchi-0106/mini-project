package com.studentmanagement.faculty.controller;

import com.studentmanagement.faculty.model.Faculty;
import com.studentmanagement.faculty.repository.FacultyRepository;
import com.studentmanagement.faculty.security.JwtUtils;
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
        if (facultyRepository.findByEmail(faculty.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already in use!");
        }
        if (facultyRepository.findByFacultyId(faculty.getFacultyId()).isPresent()) {
            return ResponseEntity.badRequest().body("Faculty ID is already in use!");
        }
        faculty.setPassword(passwordEncoder.encode(faculty.getPassword()));
        facultyRepository.save(faculty);
        return ResponseEntity.ok("Faculty registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String facultyId = loginRequest.get("facultyId");
        String password = loginRequest.get("password");

        Optional<Faculty> facultyOptional = facultyRepository.findByFacultyId(facultyId);
        if (facultyOptional.isPresent()) {
            Faculty faculty = facultyOptional.get();
            if (passwordEncoder.matches(password, faculty.getPassword())) {
                String token = jwtUtils.generateToken(facultyId);
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("facultyId", facultyId);
                response.put("name", faculty.getFacultyName());
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
