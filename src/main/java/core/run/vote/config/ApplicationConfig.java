package core.run.vote.config;

import core.run.vote.utils.FileUploadService;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import io.vertx.core.Vertx;

@ApplicationScoped
public class ApplicationConfig {
    @Inject
    Vertx vertx;

    @Produces
    @Path("/")
    public Router router() {
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create().setUploadsDirectory("uploaded_files"));
        router.post("/upload").handler(new FileUploadService()::uploadFile);
        return router;
    }
}
