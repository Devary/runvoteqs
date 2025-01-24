package core.run.vote.domain.poll.schema.votinglevel;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.UUID;

import static jakarta.ws.rs.core.Response.Status.*;

@Path("voting-level")
@Produces("application/json")
@Consumes("application/json")
public class VotingLevelResource {

    private static final Logger LOGGER = Logger.getLogger(VotingLevelResource.class.getName());

    @GET
    public Uni<List<VotingLevel>> get() {
        return VotingLevel.findAll()
                .list();
    }

    @GET
    @Path("/{id}")
    public Uni<VotingLevel> getSingle(@PathParam("id") UUID id) {
        return VotingLevel.findById(id);
    }

    @POST
    public Uni<Response> create(VotingLevel VotingLevel) {
        if (VotingLevel == null || VotingLevel.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        return Panache.withTransaction(VotingLevel::persist)
                .replaceWith(Response.ok(VotingLevel).status(CREATED)::build);
    }

    @PUT
    @Path("/{id}")
    public Uni<Response> update(@PathParam("id") UUID id, VotingLevel VotingLevel) {
        return Panache
                .withTransaction(() -> VotingLevel.<VotingLevel> findById(id)
                        .onItem().ifNotNull().invoke(entity -> {
                            entity.setVersion(VotingLevel.getVersion());
                            entity.setGroups(VotingLevel.getGroups());
                            })
                )
                .onItem().ifNotNull().transform(entity -> Response.ok(entity).build())
                .onItem().ifNull().continueWith(Response.ok().status(NOT_FOUND)::build);
    }

    @DELETE
    @Path("{id}")
    public Uni<Response> delete(@PathParam("id") UUID id) {
        return Panache.withTransaction(() -> VotingLevel.deleteById(id))
                .map(deleted -> deleted
                        ? Response.ok().status(NO_CONTENT).build()
                        : Response.ok().status(NOT_FOUND).build());
    }
}
