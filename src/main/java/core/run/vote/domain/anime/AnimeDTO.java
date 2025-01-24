package core.run.vote.domain.anime;


import core.run.vote.domain.sharacter.Sharacter;
import io.quarkus.hibernate.reactive.panache.PanacheQuery;
import io.quarkus.runtime.annotations.RegisterForReflection;

import java.util.Set;

@RegisterForReflection
public class AnimeDTO {
    PanacheQuery<AnimeDTO> query = Anime.find("select a.name, AVG(d.weight) from Anime a group by d.race").project(AnimeDTO.class);
    private String name;
    private Set<Sharacter> sharacters;
}
