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

        user.setAccount("park9691");
        user.setPassword("testPw123");
        user.setName("Sunny");

        User newUser = userRepository.save(user);
    }

    // User에서 getOrderDeatilList로 주문 상세 내역을 볼 수 있음, 이 말은 User가 Item을 참조할 ㅅ ㅜ있따는 소리
    @Test
    @Transactional
    public void read(){
        Optional<User> user =  userRepository.findByName("Sunny");

        user.ifPresent(selectUser ->{
            System.out.println();
            System.out.println();
            System.out.println(selectUser.getAccount());
            System.out.println(selectUser.getPassword());
            System.out.println();
            System.out.println();
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
