package com.portfolio.devops.service;

import com.portfolio.devops.dto.ItemRequest;
import com.portfolio.devops.entity.Item;
import com.portfolio.devops.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> findAll(String query) {
        if (query != null && !query.isBlank()) {
            return itemRepository.findByTitleContainingIgnoreCase(query);
        }
        return itemRepository.findAll();
    }

    public Item create(ItemRequest request) {
        Item item = new Item();
        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        return itemRepository.save(item);
    }

    public Item update(Long id, ItemRequest request) {
        Item existing = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));
        existing.setTitle(request.getTitle());
        existing.setDescription(request.getDescription());
        return itemRepository.save(existing);
    }

    public void delete(Long id) {
        itemRepository.deleteById(id);
    }
}

