package com.portfolio.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.portfolio.backend.model.Contact;
import com.portfolio.backend.repository.ContactRepository;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    // Save contact
    @PostMapping
    public Contact saveContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    // Get all contacts (optional for you to check in DB)
    @GetMapping
    public java.util.List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }
}
