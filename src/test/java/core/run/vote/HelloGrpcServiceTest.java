package core.run.vote;

import io.quarkus.test.junit.QuarkusTest;

import org.junit.jupiter.api.Test;

@QuarkusTest
class HelloGrpcServiceTest {
    //@GrpcClient
    //HelloGrpc helloGrpc;

    @Test
    void testHello() {
       // HelloReply reply = helloGrpc
       //         .sayHello(HelloRequest.newBuilder().setName("Neo").build()).await().atMost(Duration.ofSeconds(5));
       // assertEquals("Hello Neo!", reply.getMessage());
    }

}
