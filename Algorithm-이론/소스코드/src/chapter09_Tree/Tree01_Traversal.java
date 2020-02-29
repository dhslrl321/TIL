package chapter09_Tree;


/*
*       1
*
*   2      3
*
* 4   5
*
* InOrder : Left -> Root -> Right
* PreOrder : Root -> Left -> Right
* PostOrder : Left -> Right -> Root
* */
public class Tree01_Traversal {
    public static void main(String[] args) {
        Tree tree = new Tree();

        Node n4 = tree.makeNode(null, 4, null);
        Node n5 = tree.makeNode(null, 5, null);
        Node n3 = tree.makeNode(null, 3, null);
        Node n2 = tree.makeNode(n4, 2, n5);
        Node n1 = tree.makeNode(n2, 1, n3);

        tree.setRoot(n1);

        tree.postOrder(tree.getNode());
    }
}

class Node{
    int data;
    Node left;
    Node right;
}

class Tree{
    public Node root;

    public void setRoot(Node node){
        this.root = node;
    }

    public Node getNode(){
        return root;
    }

    public Node makeNode(Node left, int data, Node right){
        Node node = new Node();
        node.data = data;
        node.left = left;
        node.right = right;
        return node;
    }

    public void inOrder(Node node){
        if(node != null){
            inOrder(node.left);
            System.out.println(node.data);
            inOrder(node.right);
        }
    }

    public void preOrder(Node node){
        if(node != null){
            System.out.println(node.data);
            preOrder(node.left);
            preOrder(node.right);
        }
    }

    public void postOrder(Node node){
        if(node != null){
            postOrder(node.left);
            postOrder(node.right);
            System.out.println(node.data);
        }
    }
}