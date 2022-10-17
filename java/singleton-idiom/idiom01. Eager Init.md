# Eager Initialization

```java
public class Serializer {
    private static final Serializer instance = new Serializer();

    private Serializer() {}

    public static Serializer getInstance() {
        return instance;
    }

    public void serialize(String provided) {
        System.out.println("provided = " + provided);
    }
}
```
