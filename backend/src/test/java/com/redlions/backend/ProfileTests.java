package com.redlions.backend;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
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

    @Test
    public void CreateUser() throws IOException {
        String payload = "{" +
                    "\"email\": \"bob221@gmail.com\"," +
                    "\"password\": \"password1234\"" +
                "}";
        StringEntity entity = new StringEntity(payload,
                ContentType.APPLICATION_JSON);

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost(URL + "/signup");
        request.setEntity(entity);
        HttpResponse response = httpClient.execute(request);
        assertEquals(response.getStatusLine().getStatusCode(), HttpStatus.OK.value());
    }
}
