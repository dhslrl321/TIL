package com.example.jpatest.repository;

import com.example.jpatest.JpatestApplicationTests;
import com.example.jpatest.model.entity.OrderDetail;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

public class OrderDetailRepositoryTests extends JpatestApplicationTests {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Test
    public void create(){
        OrderDetail orderDetail = new OrderDetail();

        /*orderDetail.setOrderAt(LocalDateTime.now());
        orderDetail.setUserId(1L);
        orderDetail.setItemId();*/
        // 1L 이라는 사람이
        //orderDetail.setUserId(5L);
        // 1L 이라는 item을 주문하였다.
        //orderDetail.setItemId(1L);

        OrderDetail newOrder = orderDetailRepository.save(orderDetail);
    }

    @Test
    @Transactional
    public void read(){
        Optional<OrderDetail> orderDetail = orderDetailRepository.findById(4L);

        orderDetail.ifPresent(orderDetail1 -> {
            System.out.println();
            System.out.println();
            System.out.println(orderDetail1.getUser());
            System.out.println(orderDetail1.getItem());
            System.out.println();
            System.out.println();
        });
    }
}
