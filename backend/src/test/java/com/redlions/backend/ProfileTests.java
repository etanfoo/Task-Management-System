package com.redlions.backend;

import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.HttpClientBuilder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;

import java.io.IOException;

import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
public class ProfileTests {
    int PORT = 7777;
    String URL = String.format("http://localhost:%d/api/v1/profile", PORT);

    @Test
    public void UserNotFound_Throws404() throws IOException {
        long id = 9929;
        HttpUriRequest request = new HttpGet(URL + "/" + id);
        HttpResponse httpResponse = HttpClientBuilder.create().build().execute( request );
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());

        String id2 = "horse";
        request = new HttpGet(URL + "/" + id2);
        httpResponse = HttpClientBuilder.create().build().execute( request );
        assertEquals(httpResponse.getStatusLine().getStatusCode(), HttpStatus.BAD_REQUEST.value());
    }
}
