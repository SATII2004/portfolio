package com.portfolio.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.portfolio.backend.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
