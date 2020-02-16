package com.example.jpatest.controller;

import com.example.jpatest.model.entity.Item;
import com.example.jpatest.model.entity.OrderDetail;
import com.example.jpatest.model.entity.User;
import com.example.jpatest.repository.ItemRepository;
import com.example.jpatest.repository.OrderDetailRepository;
import com.example.jpatest.repository.UserRepository;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

@RestController
@RequestMapping("/item")
public class ItemController {

    /*@Autowired
    UserRepository userRepository;
    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    ItemRepository itemRepository;

    @GetMapping("/order")
    public String order(@RequestParam Long userId, @RequestParam Long itemId){
        AtomicBoolean userFlag = new AtomicBoolean(false);
        AtomicBoolean itemFlag = new AtomicBoolean(false);

        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(selectUser ->{
            userFlag.set(true);
        });

        Optional<Item> item = itemRepository.findById(itemId);
        item.ifPresent(selectItem ->{
            itemFlag.set(true);
        });

        if (userFlag.get() && itemFlag.get()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setUserId(userId);
            orderDetail.setItemId(itemId);
            orderDetail.setOrderAt(LocalDateTime.now());

            OrderDetail newOrder = orderDetailRepository.save(orderDetail);
            return "주문 정보" + newOrder + " 의 주문이 주문 되었습니다.";
        }

        return "잘못된 주문 입니다.";
    }*/
}
