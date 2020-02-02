package com.example.jpatest.model.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"user","item"}) // 연관관계 설정한 변수는 exclude 설정을 꼭 해줘야 한다.
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime orderAt;

    //외래키로 user의 id를 받아 옴
    @ManyToOne
    private User user;
    // 외래키로 item의 id를 받아 옴
    @ManyToOne
    private Item item;
}
