package core.run.vote.utils;
import io.vertx.ext.web.FileUpload;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;


@Path("/upload")
public class FileUploadService {
    @ConfigProperty(name = "quarkus.http.body.uploads-directory")
    String UPLOAD_DIR;

    public void configureRoutes(io.vertx.ext.web.Router router) {
        router.route().handler(BodyHandler.create().setUploadsDirectory("uploaded_files"));

        // Define POST endpoint for file uploads
        router.post("/upload").handler(this::uploadFile);
    }

    // Configure the routes in a Quarkus class with @Path and register body handler
    @POST
    public Response uploadFile(RoutingContext context) {
        // Get the file from the uploaded data
        FileUpload uploadedFile = context.fileUploads().iterator().next();

        // Get the file path
        String uploadedFilePath = uploadedFile.uploadedFileName();

        // Here, you can process the file as necessary
        System.out.println("File uploaded to: " + uploadedFilePath);

        // Return a success message with the file name
        return Response.ok("File uploaded successfully: " + uploadedFile.fileName()).build();
    }
}
