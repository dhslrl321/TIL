# Lazy Initialization

```java
public class Serializer {
    private static Serializer instance;

    private Serializer() {}

    public static Serializer getInstance() {
        if (Objects.isNull(instance)) {
            instance = new Serializer();
        }
        return instance;
    }

    public void serialize(String provided) {
        System.out.println("provided = " + provided);
    }
}
```
