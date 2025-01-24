package core.run.vote.domain.anime;

import core.run.vote.domain.sharacter.Sharacter;
import io.quarkus.hibernate.reactive.panache.Panache;
import io.quarkus.panache.common.Sort;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.UUID;

import static jakarta.ws.rs.core.Response.Status.*;

@Path("animes")
@Produces("application/json")
@Consumes("application/json")
public class AnimeResource {

    private static final Logger LOGGER = Logger.getLogger(AnimeResource.class.getName());

    @GET
    public Uni<List<Anime>> get() {
        return Anime.findAll(Sort.by("name"))
                .list();
    }

    @GET
    @Path("/{id}")
    public Uni<Anime> getSingle(@PathParam("id") UUID id) {
        return Anime.findById(id);
    }

    @POST
    public Uni<Response> create(Anime anime) {
        if (anime == null || anime.getId() != null) {
            throw new WebApplicationException("Id was invalidly set on request.", 422);
        }

        return Panache.withTransaction(anime::persist)
                .replaceWith(Response.ok(anime).status(CREATED)::build);
    }

    @PUT
    @Path("/{id}")
    public Uni<Response> update(@PathParam("id") UUID id, Anime anime) {
        if (anime == null || anime.getName() == null) {
            throw new WebApplicationException("Anime name was not set on request.", 422);
        }

        return Panache
                .withTransaction(() -> Anime.<Anime> findById(id)
                        .onItem().ifNotNull().invoke(entity -> {
                            entity.setName(anime.getName());
                            entity.setDescription(anime.getDescription());
                            entity.setSharacters(anime.getSharacters());
                            })
                )
                .onItem().ifNotNull().transform(entity -> Response.ok(entity).build())
                .onItem().ifNull().continueWith(Response.ok().status(NOT_FOUND)::build);
    }

    @DELETE
    @Path("{id}")
    public Uni<Response> delete(@PathParam("id") UUID id) {
        return Panache.withTransaction(() -> Anime.deleteById(id))
                .map(deleted -> deleted
                        ? Response.ok().status(NO_CONTENT).build()
                        : Response.ok().status(NOT_FOUND).build());
    }
}
