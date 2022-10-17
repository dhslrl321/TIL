# on demand holder

```java
public class Serializer {
    private static Serializer instance;

    private Serializer() {}

    private static class SerializerHolder {
        private static final Serializer instance = new Serializer();
    }

    public static Serializer getInstance() {
        return SerializerHolder.instance;
    }

    public void serialize(String provided) {
        System.out.println("provided = " + provided);
    }
}
```
