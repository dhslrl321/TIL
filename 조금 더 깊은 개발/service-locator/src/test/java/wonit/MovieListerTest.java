package wonit;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MovieListerTest {

    MovieLister sut = new MovieLister();

    @Test
    void name() {
        String directorName = "jang";
        Movie[] actual = sut.moviesDirectedBy(directorName);
    }
}