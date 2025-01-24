package core.run.vote.domain.poll.schema.votinggroup;

import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.UUID;

import static jakarta.ws.rs.core.Response.Status.*;

@Path("voting-group")
@Produces("application/json")
@Consumes("application/json")
public class VotingGroupResource {

    private static final Logger LOGGER = Logger.getLogger(VotingGroupResource.class.getName());

    @GET
    public Uni<List<VotingGroup>> get() {
        return VotingGroup.findAll()
                .list();
    }

    @GET
    @Path("/{id}")
    public Uni<VotingGroup> getSingle(@PathParam("id") UUID id) {
        return VotingGroup.findById(id);
    }

    @POST
    public Uni<Response> create(VotingGroup VotingGroup) {
        if (VotingGroup == null || VotingGroup.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        return Panache.withTransaction(VotingGroup::persist)
                .replaceWith(Response.ok(VotingGroup).status(CREATED)::build);
    }

    @PUT
    @Path("/{id}")
    public Uni<Response> update(@PathParam("id") UUID id, VotingGroup VotingGroup) {
        return Panache
                .withTransaction(() -> VotingGroup.<VotingGroup> findById(id)
                        .onItem().ifNotNull().invoke(entity -> {
                            entity.setSharacters(VotingGroup.getSharacters());
                            entity.setType(VotingGroup.getType());
                            entity.setAnimes(VotingGroup.getAnimes());
                            entity.setPolls(VotingGroup.getPolls());
                            entity.setGroupResult(VotingGroup.getGroupResult());
                            })
                )
                .onItem().ifNotNull().transform(entity -> Response.ok(entity).build())
                .onItem().ifNull().continueWith(Response.ok().status(NOT_FOUND)::build);
    }

    @DELETE
    @Path("{id}")
    public Uni<Response> delete(@PathParam("id") UUID id) {
        return Panache.withTransaction(() -> VotingGroup.deleteById(id))
                .map(deleted -> deleted
                        ? Response.ok().status(NO_CONTENT).build()
                        : Response.ok().status(NOT_FOUND).build());
    }
}
