package chapter09_Tree;

import java.util.TreeSet;

public class Tree03_UseLib {
    public static void main(String[] args) {
        TreeSet<Integer> tree = new TreeSet<>();

        tree.add(10); tree.add(31); tree.add(1);
        tree.add(8); tree.add(11); tree.add(2);

        System.out.println(tree);

        System.out.println(tree.subSet(0, 10));
        System.out.println(tree.headSet(10) + " <- Head Set");
        System.out.println(tree.tailSet(10) + " <- Tail Set");
    }
}
