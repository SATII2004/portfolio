package com.portfolio.devops.controller;

import com.portfolio.devops.dto.ItemRequest;
import com.portfolio.devops.entity.Item;
import com.portfolio.devops.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
@CrossOrigin(origins = "*")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<List<Item>> getItems(@RequestParam(value = "q", required = false) String query) {
        return ResponseEntity.ok(itemService.findAll(query));
    }

    @PostMapping
    public ResponseEntity<Item> create(@Valid @RequestBody ItemRequest request) {
        return ResponseEntity.ok(itemService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> update(@PathVariable Long id, @Valid @RequestBody ItemRequest request) {
        return ResponseEntity.ok(itemService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

