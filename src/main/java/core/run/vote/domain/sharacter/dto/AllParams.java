package core.run.vote.domain.sharacter.dto;

import core.run.vote.domain.anime.Anime;
import core.run.vote.domain.role.Role;
import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;
import java.util.UUID;

@RegisterForReflection
@Getter
@Setter
public class AllParams {
    private UUID id;
    public String name;
    private Set<Role> roles;
    private String description;
    private Anime anime;
    private boolean is_deleted;
}
