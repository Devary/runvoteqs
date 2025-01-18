package core.run.vote.role;

import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SoftDelete;
import org.hibernate.annotations.SoftDeleteType;

import java.util.Map;
import java.util.UUID;

@Entity
@Getter
@Setter
@SoftDelete(strategy = SoftDeleteType.DELETED,columnName = "isDeleted")
public class Role extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String description;
    //@ElementCollection
    //private Map<String,Object> meta;
}
