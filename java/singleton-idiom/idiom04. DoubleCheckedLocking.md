# Thread Safe Lazy Init + Double Checked Locking

```java
public class Serializer {
    private static Serializer instance;

    private Serializer() {}

    public static Serializer getInstance() {

        if (Objects.isNull(instance)) {
            synchronized (Serializer.class) {
                if (Objects.isNull(instance)) {
                    instance = new Serializer();
                }
            }
            instance = new Serializer();
        }
        return instance;
    }

    public void serialize(String provided) {
        System.out.println("provided = " + provided);
    }
}
```
