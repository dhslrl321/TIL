import java.util.*;

public class Test {
    public static void main(String[] args) {

    }
}

class BST {
    Node root = new Node();

    void addNode(int value){
        if(findNode(value) != null) return ;

        Node newNode = new Node(value);

        if(root == null) {
            root = newNode;
        } else {
            Node pointerNode = root;
            Node parent;
        }

    }

    Node findNode(int data){
        if(root == null) return null;

        Node pointerNode = root;

        while(pointerNode.data != data){
            if(pointerNode.data > data){
                pointerNode = pointerNode.left;
            }else{
                pointerNode = pointerNode.right;
            }

            if(pointerNode == null) return null;
        }
        return pointerNode;
    }
}

class Node{
    int data;
    Node left;
    Node right;

    Node(){}
    Node(int x) { data = x;}
}