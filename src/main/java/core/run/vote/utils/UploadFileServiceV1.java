package core.run.vote.utils;

import io.vertx.ext.web.FileUpload;
import jakarta.ws.rs.*;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@Path("/v1")
public class UploadFileServiceV1 {
    @POST
    @Path("/upload")
    public Map<String, String> save(@RestForm File fileCreateRequest) {
        // do some validations and save the file to some repository


        java.nio.file.Path path
                = Paths.get("C:\\test2\\gfg.txt");

        // Custom string as an input
        String str
                = fileCreateRequest.getName();

        // Converting string to byte array
        // using getBytes() method
        byte[] arr = str.getBytes();

        // Try block to check for exceptions
        try {
            // Now calling Files.write() method using path
            // and byte array
            Files.write(path, arr);
        }

        // Catch block to handle the exceptions
        catch (IOException ex) {
            // Print message as exception occurred when
            // invalid path of local machine is passed
            System.out.print("Invalid Path");
        }

        return new HashMap<>();
    }

}