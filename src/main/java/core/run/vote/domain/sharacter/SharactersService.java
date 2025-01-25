package core.run.vote.domain.sharacter;

import core.run.vote.domain.anime.Anime;
import core.run.vote.domain.sharacter.dto.AllParams;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.util.List;

@Transactional
@ApplicationScoped
public class SharactersService {

    public Uni<List<AllParams>> getAllSharacters() {
        return Sharacter.findAll().project(AllParams.class).list().onItem().invoke(
                sharacter ->
                {
                    Anime.find("#AnimeBySharacter")
                            .project(AllParams.class)
                            .firstResult()
                            .onItem().ifNotNull().invoke(anime -> {
                                sharacter.set(4,anime);
                            });
                    return;
                }
        );

    }
}
