package chapter10_Graph;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class Graph01_BFS {
    public static void main(String[] args) {
        BFS_Graph graph = new BFS_Graph(9);
        graph.addEdge(0, 1);
        graph.addEdge(1, 2);
        graph.addEdge(1, 3);
        graph.addEdge(2, 4);
        graph.addEdge(2, 3);
        graph.addEdge(3, 4);
        graph.addEdge(3, 5);
        graph.addEdge(5, 6);
        graph.addEdge(5, 7);
        graph.addEdge(6, 8);
        graph.dfs();
        graph.bfs();
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

    void addEdge(int idx1, int idx2){
        Node n1 = nodes[idx1];
        Node n2 = nodes[idx2];
        if(!n1.adjacent.contains(n2)) n1.adjacent.add(n2);
        if(!n2.adjacent.contains(n1)) n2.adjacent.add(n1);
    }

    void dfs(){ dfs(0);}
    void dfs(int index){
        Node root = nodes[index];
        Stack<Node> stack = new Stack<Node>();
        stack.push(root);
        while(!stack.isEmpty()){
            Node r = stack.pop();
            for(Node n : r.adjacent) {
                if(n.marked == false){
                    n.marked = true;
                    stack.push(n);
                }
            }
            visit(r);
        }
    }

    void bfs(){ bfs(0);}
    void bfs(int index){
        Node root = nodes[index];
        Queue<Node> queue = new LinkedList<Node>();
        queue.add(root);
        root.marked = true;

        while(!queue.isEmpty()){
            Node r = queue.poll();
            for(Node n : r.adjacent){
                if(n.marked == false){
                    n.marked = true;
                    queue.add(n);
                }
            }
            visit(r);
        }
    }

    void dfsR(Node r) {
        if(r==null) return;
        r.marked = true;
        visit(r);
        for(Node n : r.adjacent){
            if(n.marked == false){
                dfsR(n);
            }
        }
    }

    private void visit(Node r) {
        System.out.print(r.data + " ");
    }
}

