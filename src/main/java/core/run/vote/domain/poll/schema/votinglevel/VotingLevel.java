package core.run.vote.domain.poll.schema.votinglevel;



import core.run.vote.domain.poll.schema.votinggroup.VotingGroup;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
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
public class VotingLevel extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Version
    private long version;
    @ManyToMany
    @Fetch(FetchMode.SELECT)
    private Set<VotingGroup> groups;
}
