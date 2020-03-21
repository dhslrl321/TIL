package theory.chapter10_Graph;

import java.util.ArrayList;
import java.util.Scanner;

public class Graph02_AdjacencyList {
    public static void main(String[] args) {
        int vertexNum;
        int edgeNum;

        Scanner input = new Scanner(System.in);

        vertexNum = input.nextInt();
        edgeNum = input.nextInt();

        ArrayList<ArrayList<Integer>> map = new ArrayList<ArrayList<Integer>>();

        for (int i = 0; i < vertexNum; i++) {
            map.add(new ArrayList<Integer>());
        }

        for (int i = 0; i < edgeNum; i++) {
            int t1, t2;
            t1 = input.nextInt(); t2 = input.nextInt();

            map.get(t1).add(t2);
            map.get(t2).add(t1);
        }
    }
}