package com.example.jpatest.repository;

import com.example.jpatest.JpatestApplicationTests;
import com.example.jpatest.model.entity.Item;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class ItemRepositoryTests extends JpatestApplicationTests {
    @Autowired
    private ItemRepository itemRepository;

    @Test
    public void create(){
        Item item = new Item();

        item.setName("LG Gram 9");
        item.setPrice(1128000);
        item.setContent("LG");

        Item newItem = itemRepository.save(item);
        Assert.assertNotNull(newItem);
    }

    @Test
    public void read(){
        Optional<Item> item = itemRepository.findById(3L);

        Assert.assertNotNull(item);
        item.ifPresent(item1 -> {
            System.out.println(item1.getName());
        });
    }
}
