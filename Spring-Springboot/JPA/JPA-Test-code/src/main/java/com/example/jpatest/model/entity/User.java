package com.example.jpatest.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String account;
    private String password;
    private String name;

    // User의 입장에서는 1 : N으로 OrderDetail과 연결이 되므로 OneToMany를 쓰고 user 테이블에 연결 시키기 위해서 mappedBy = user"해준다. 저기 user는 orderDetail
    // 의 ManyToOne의 변수 이름과 동일해야 한다.
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<OrderDetail> orderDetailList;

}
