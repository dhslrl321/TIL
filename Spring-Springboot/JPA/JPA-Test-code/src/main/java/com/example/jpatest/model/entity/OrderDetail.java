package com.example.jpatest.model.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@ToString(exclude = {"user","item"}) // 연관관계 설정한 변수는 exclude 설정을 꼭 해줘야 한다.
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime orderAt;

    @ManyToOne
    private User user;

    @ManyToOne
    private Item item;

}

