package com.example.jpatest.repository;


import com.example.jpatest.JpatestApplicationTests;
import com.example.jpatest.model.entity.Item;
import com.example.jpatest.model.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import java.util.Optional;

public class UserRepositoryTests extends JpatestApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void create(){
        User user = new User();

        user.setAccount("KaKao123");
        user.setPassword("testPw123");
        user.setName("Onigi");

        User newUser = userRepository.save(user);
    }

    @Test
    @Transactional
    public void read(){
        Optional<User> user =  userRepository.findById(5L);

        user.ifPresent(selectUser ->{
            selectUser.getOrderDetailList().stream().forEach(orderDetail -> {
                Item item = orderDetail.getItem();
                System.out.println(item);
            });
        });
    }

    @Test
    public void update(){
        Optional<User> user = userRepository.findById(1L);

        user.ifPresent(selectUser->{
            selectUser.setName("김민수");
            selectUser.setAccount("kimMin123");
            userRepository.save(selectUser);
        });
    }

    @Test
    public void delete(){
        Optional<User> user = userRepository.findById(4L);
        user.ifPresent(selectUser ->{
            userRepository.delete(selectUser);
        });
    }

}
