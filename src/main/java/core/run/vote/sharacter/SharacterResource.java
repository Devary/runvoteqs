package core.run.vote.sharacter;

import static jakarta.ws.rs.core.Response.Status.CREATED;
import static jakarta.ws.rs.core.Response.Status.NOT_FOUND;
import static jakarta.ws.rs.core.Response.Status.NO_CONTENT;

import java.util.List;
import java.util.UUID;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import org.jboss.logging.Logger;


import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;

@Path("sharacters")
@ApplicationScoped
@Produces("application/json")
@Consumes("application/json")
public class SharacterResource {

    private static final Logger LOGGER = Logger.getLogger(SharacterResource.class.getName());

    @GET
    public Uni<List<Sharacter>> get() {
        return Sharacter.listAll(Sort.by("name"));
    }

    @GET
    @Path("/{id}")
    public Uni<Sharacter> getSingle(@PathParam("id") UUID id) {
        return Sharacter.findById(id);
    }

    @POST
    public Uni<Response> create(Sharacter sharacter) {
        if (sharacter == null || sharacter.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        return Panache.withTransaction(sharacter::persist)
                .replaceWith(Response.ok(sharacter).status(CREATED)::build);
    }

    @PUT
    @Path("/{id}")
    public Uni<Response> update(@PathParam("id") UUID id, Sharacter sharacter) {
        if (sharacter == null || sharacter.getName() == null) {
            throw new WebApplicationException("Sharacter name was not set on request.", 422);
        }

        return Panache
                .withTransaction(() -> Sharacter.<Sharacter> findById(id)
                        .onItem().ifNotNull().invoke(entity -> {
                            entity.setName(sharacter.getName());
                            entity.setRole(sharacter.getRole());
                            entity.setDescription(sharacter.getDescription());
                        } )
                )
                .onItem().ifNotNull().transform(entity -> Response.ok(entity).build())
                .onItem().ifNull().continueWith(Response.ok().status(NOT_FOUND)::build);
    }

    @DELETE
    @Path("{id}")
    public Uni<Response> delete(@PathParam("id") UUID id) {
        return Panache.withTransaction(() -> Sharacter.deleteById(id))
                .map(deleted -> deleted
                        ? Response.ok().status(NO_CONTENT).build()
                        : Response.ok().status(NOT_FOUND).build());
    }
}
