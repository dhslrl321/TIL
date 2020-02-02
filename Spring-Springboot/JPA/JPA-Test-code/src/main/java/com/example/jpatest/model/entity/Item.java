package com.example.jpatest.model.entity;

import lombok.Data;
import org.graalvm.compiler.nodes.graphbuilderconf.GeneratedInvocationPlugin;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer price;
    private String content;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "item")
    private List<OrderDetail> orderDetailList;
}
