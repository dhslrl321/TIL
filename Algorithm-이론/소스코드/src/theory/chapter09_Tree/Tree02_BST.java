package theory.chapter09_Tree;

public class Tree02_BST {
    public static void main(String[] args) {


    }
}
class Node {
    int key; // value
    Node leftChild; // left Node
    Node rightChild; // right Node

    Node (int key) { // generator
        this.key = key;
    }
    public String toString(){ // for printing
        return "key : " + this.key;
    }
}
class BinarySearchTree{

    private Node root; // root node

    public Node getRoot(){
        return this.root;
    }

    public void addNode(int key){

        if(findNode(key) != null) return; // 키 값이 존재하면 리턴

        Node newNode = new Node(key);

        if(root == null){//트리가 비어 있을 때
            root = newNode; // 트리가 비어있으면 새로운 노드를 root로 만들고 종료
        } else{ // 트리가 비어있지 않을 때 (트리 삽입 검사)
            Node focusNode = root;
            Node parent;
            // focus 노드가 점점 한 칸씩 내려가며 부모 노드가 됨
            while(true){
                parent = focusNode;
                if(key < parent.key) { //부모 노드의 키보다 작을 경우

                    focusNode = parent.leftChild;

                    if(focusNode == null){
                        parent.leftChild = newNode;
                        return ;
                    }

                }else { //부모 노드의 키보다 클 경우

                    focusNode = parent.rightChild;

                    if(focusNode == null){
                        parent.rightChild = newNode;
                        return ;
                    }

                }
            }
        }
    }

    private Node findNode(int key) {

        if(root == null) return null; // Tree is empty

        Node focusNode = root;

        while(focusNode.key != key) {
            if(key < focusNode.key) focusNode = focusNode.leftChild;
            else focusNode = focusNode.rightChild;
            // 찾으려는 노드가 없을 때
            if (focusNode == null) return null;
        }
        return focusNode;
    }

}