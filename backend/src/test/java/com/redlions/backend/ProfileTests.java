package com.redlions.backend;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class ProfileTests {
    int PORT = 7777;
    String URL = String.format("http://localhost:%d/api/v1/profile", PORT);

    @Test
    public void GetUserWithInvalidId_Throws400() throws IOException {
        String id = "9929";
        HttpUriRequest request = new HttpGet(URL + "/" + id);
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute( request );
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());

        String id2 = "horse";
        request = new HttpGet(URL + "/" + id2);
        httpResponse = HttpClientBuilder.create().build().execute( request );
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void GetUserWithValidId_Throws200() throws IOException {
        String id = "1";
        HttpUriRequest request = new HttpGet(URL + "/" + id);
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute( request );
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.OK.value());
    }

    //@Test
    //public void UpdateUserWithAboutMeAbove300Characters_Throws400() throws IOException, URISyntaxException {
    //    String aboutMe = "...";
    //
    //    URIBuilder builder = new URIBuilder(URL + "/1" + "1");
    //    builder.setParameter("aboutMe", aboutMe);
    //    URI uri = builder.build();
    //    HttpUriRequest request = new HttpPut(uri);
    //    String bob = request.getURI().toString();
    //    HttpResponse httpResponse = HttpClientBuilder.create().build().execute( request );
    //    assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());
    //}

}
