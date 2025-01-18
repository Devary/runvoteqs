package core.run.vote.role;

import core.run.vote.sharacter.Sharacter;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;
import jakarta.persistence.PersistenceException;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.UUID;

import static jakarta.ws.rs.core.Response.Status.*;

@Path("roles")
@Produces("application/json")
@Consumes("application/json")
public class RoleResource {

    private static final Logger LOGGER = Logger.getLogger(RoleResource.class.getName());

    @GET
    public Uni<List<Role>> get() {
        return Role.listAll(Sort.by("name"));
    }

    @GET
    @Path("/{id}")
    public Uni<Role> getSingle(@PathParam("id") UUID id) {
        return Role.findById(id);
    }

    @POST
    public Uni<Response> create(Role role) {
        if (role == null || role.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        return Panache.withTransaction(role::persist)
                .replaceWith(Response.ok(role).status(CREATED)::build);
    }

    @PUT
    @Path("/{id}")
    public Uni<Response> update(@PathParam("id") UUID id, Role role) {
        if (role == null || role.getName() == null) {
            throw new WebApplicationException("Role name was not set on request.", 422);
        }

        return Panache
                .withTransaction(() -> Role.<Role> findById(id)
                        .onItem().ifNotNull().invoke(entity -> {
                            entity.setName(role.getName());
                            entity.setDescription(role.getDescription());
                            //entity.setMeta(role.getMeta());
                        } )
                )
                .onItem().ifNotNull().transform(entity -> Response.ok(entity).build())
                .onItem().ifNull().continueWith(Response.ok().status(NOT_FOUND)::build);
    }

    @DELETE
    @Path("{id}")
    public Uni<Response> delete(@PathParam("id") UUID id) {
        return Panache.withTransaction(() -> Role.deleteById(id))
                .map(deleted -> deleted
                        ? Response.ok().status(NO_CONTENT).build()
                        : Response.ok().status(NOT_FOUND).build());
    }
}
