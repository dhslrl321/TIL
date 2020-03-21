package theory.chapter09_Tree;


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

        MyNode n4 = tree.makeNode(null, 4, null);
        MyNode n5 = tree.makeNode(null, 5, null);
        MyNode n3 = tree.makeNode(null, 3, null);
        MyNode n2 = tree.makeNode(n4, 2, n5);
        MyNode n1 = tree.makeNode(n2, 1, n3);

        tree.setRoot(n1);

        tree.postOrder(tree.getNode());
    }
}

class MyNode {
    int data;
    MyNode left;
    MyNode right;
}

class Tree{
    public MyNode root;

    public void setRoot(MyNode myNode){
        this.root = myNode;
    }

    public MyNode getNode(){
        return root;
    }

    public MyNode makeNode(MyNode left, int data, MyNode right){
        MyNode myNode = new MyNode();
        myNode.data = data;
        myNode.left = left;
        myNode.right = right;
        return myNode;
    }

    public void inOrder(MyNode myNode){
        if(myNode != null){
            inOrder(myNode.left);
            System.out.println(myNode.data);
            inOrder(myNode.right);
        }
    }

    public void preOrder(MyNode myNode){
        if(myNode != null){
            System.out.println(myNode.data);
            preOrder(myNode.left);
            preOrder(myNode.right);
        }
    }

    public void postOrder(MyNode myNode){
        if(myNode != null){
            postOrder(myNode.left);
            postOrder(myNode.right);
            System.out.println(myNode.data);
        }
    }
}