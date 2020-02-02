package com.example.jpatest.repository;

import com.example.jpatest.JpatestApplicationTests;
import com.example.jpatest.model.entity.OrderDetail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

public class OrderDetailRepositoryTests extends JpatestApplicationTests {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Test
    public void create(){
        OrderDetail orderDetail = new OrderDetail();

        orderDetail.setOrderAt(LocalDateTime.now());

        // 1L 이라는 사람이
        //orderDetail.setUserId(1L);
        // 1L 이라는 item을 주문하였다.
        //orderDetail.setItemId(1L);

        OrderDetail newOrder = orderDetailRepository.save(orderDetail);
    }
}
