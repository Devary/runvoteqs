package core.run.vote.domain.poll;

import core.run.vote.domain.role.Role;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.UUID;

import static jakarta.ws.rs.core.Response.Status.*;

@Path("single-poll")
@Produces("application/json")
@Consumes("application/json")
public class SPollResource {

    private static final Logger LOGGER = Logger.getLogger(SPollResource.class.getName());

    @GET
    public Uni<List<SPoll>> get() {
        return SPoll.findAll(Sort.by("name"))
                .list();
    }

    @GET
    @Path("/{id}")
    public Uni<SPoll> getSingle(@PathParam("id") UUID id) {
        return SPoll.findById(id);
    }

    @POST
    public Uni<Response> create(SPoll SPoll) {
        if (SPoll == null || SPoll.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        return Panache.withTransaction(SPoll::persist)
                .replaceWith(Response.ok(SPoll).status(CREATED)::build);
    }

    @PUT
    @Path("/{id}")
    public Uni<Response> update(@PathParam("id") UUID id, SPoll SPoll) {
        if (SPoll == null || SPoll.getName() == null) {
            throw new WebApplicationException("Single poll name was not set on request.", 422);
        }

        return Panache
                .withTransaction(() -> Role.<Role> findById(id)
                        .onItem().ifNotNull().invoke(entity -> {
                            entity.setName(SPoll.getName());
                            entity.setDescription(SPoll.getDescription());
                            })
                )
                .onItem().ifNotNull().transform(entity -> Response.ok(entity).build())
                .onItem().ifNull().continueWith(Response.ok().status(NOT_FOUND)::build);
    }

    @DELETE
    @Path("{id}")
    public Uni<Response> delete(@PathParam("id") UUID id) {
        return Panache.withTransaction(() -> SPoll.deleteById(id))
                .map(deleted -> deleted
                        ? Response.ok().status(NO_CONTENT).build()
                        : Response.ok().status(NOT_FOUND).build());
    }
}
