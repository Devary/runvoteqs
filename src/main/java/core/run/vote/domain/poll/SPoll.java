package core.run.vote.domain.poll;



import core.run.vote.domain.VotingSubject;
import core.run.vote.domain.sharacter.Sharacter;
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
public class SPoll extends PanacheEntityBase implements VotingSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @ManyToMany()
    private Set<Sharacter> sharacters;
    private String description;
}
