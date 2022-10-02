package com.redlions.backend;

import com.redlions.backend.entity.Profile;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class ProfileTests {
    int PORT = 7777;
    String URL = String.format("http://localhost:%d/api/v1/profile", PORT);

    @Test
    public void GetUserWithInvalidId_Throws400() throws IOException {
        String id = "9929";
        HttpUriRequest request = new HttpGet(URL + "/" + id);
        HttpResponse response = HttpClientBuilder.create().build().execute( request );
        assertEquals(response.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());

        String id2 = "horse";
        request = new HttpGet(URL + "/" + id2);
        response = HttpClientBuilder.create().build().execute( request );

        assertEquals(response.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void GetUserWithValidId_Throws200() throws IOException {
        String id = "1";
        HttpUriRequest request = new HttpGet(URL + "/" + id);
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute( request );
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.OK.value());
    }

    //@Test
    //public void CreateUser() throws IOException, URISyntaxException {
    //    Profile profile = new Profile(10L, "batman", "profile1@email.com", "password", 1L, 1L, "aboutme", "temp".getBytes());
    //    URIBuilder builder = new URIBuilder(URL);
    //    builder.setParameter("profile", profile);
    //    URI uri = builder.build();
    //    HttpUriRequest request = new HttpPost(uri);
    //    HttpResponse httpResponse = HttpClientBuilder.create().build().execute( request );
    //    assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());
    //}

}
