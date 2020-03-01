package chapter10_Graph;

import java.util.LinkedList;

public class Graph01_BFS {
    public static void main(String[] args) {

    }
}

class BFS_Graph {
    class Node{
        int data;
        LinkedList<Node> adjacent; //인접 리스트
        boolean marked; //방문했는지 확인하는 플래그
        Node (int data) {
            this.data = data;
            this.marked = false;
            adjacent = new LinkedList<Node>();
        }
    }

    Node[] nodes;

    BFS_Graph(int size){
        nodes = new Node[size];
        for (int i = 0; i < size; i++) {
            nodes[i] = new Node(i);
        }
    }
}

