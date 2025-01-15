package core.run.vote.utils;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestForm;

import java.io.InputStream;


public interface MultipartService {
    @POST
    @Path("/multipart")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.TEXT_PLAIN)
    String sendMultipartData(@RestForm MultipartBody data);

    @GET
    @Path("/files/{name}")
    InputStream get(@PathParam("name") String name);
}
