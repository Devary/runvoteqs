package core.run.vote.domain.poll.schema.votinggroup;



import core.run.vote.domain.VotingSubject;
import core.run.vote.domain.anime.Anime;
import core.run.vote.domain.annotations.VotingGroupType;
import core.run.vote.domain.poll.SPoll;
import core.run.vote.domain.sharacter.Sharacter;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SoftDelete;
import org.hibernate.annotations.SoftDeleteType;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SoftDelete(strategy = SoftDeleteType.DELETED,columnName = "isDeleted")
public class VotingGroup extends PanacheEntityBase implements VotingSubject{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToMany
    private Set<Sharacter> sharacters;

    @ManyToMany
    private Set<SPoll> polls;

    @ManyToMany
    private Set<VotingGroup> groupResult;

    @ManyToMany
    private Set<Anime> animes;

    @Enumerated
    private VotingGroupType type;


    //private Set<? extends VotingSubject> getVotingSubject(){
    //    return switch (type){
    //        case NONE -> this.getSharacters();
    //        case POLL -> this.getPolls();
    //        case RESULT -> this.getGroupResult();
    //        default -> null;
    //    };
    //}
}
