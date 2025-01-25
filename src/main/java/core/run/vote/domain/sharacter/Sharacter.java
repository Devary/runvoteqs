package core.run.vote.domain.sharacter;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.errorprone.annotations.CanIgnoreReturnValue;
import core.run.vote.domain.anime.Anime;
import core.run.vote.domain.role.Role;
import core.run.vote.sql.NamedQueryList;
import io.quarkus.hibernate.reactive.panache.PanacheEntityBase;
import io.quarkus.runtime.annotations.IgnoreProperty;
import io.smallrye.mutiny.Uni;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.NamedNativeQueries;
import jakarta.persistence.NamedNativeQuery;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jdk.jfr.Name;
import lombok.*;
import org.hibernate.annotations.*;


import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SoftDelete(strategy = SoftDeleteType.DELETED,columnName = "isDeleted")
@SecondaryTable(
        name = "anime_sharacter",
        pkJoinColumns = @PrimaryKeyJoinColumn(name = "sharacters_id")
)
@NamedQueries({
        @NamedQuery(name = "Sharacter.WithoutAnime", query = NamedQueryList.SHARACTERS_WITHOUT_ANIME)
})
public class Sharacter extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @ManyToMany(fetch = FetchType.LAZY,cascade = CascadeType.REFRESH)
    @Fetch(FetchMode.JOIN)
    private Set<Role> roles;
    private String description;
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnoreProperties("sharacters")
    @JoinColumn(table = "anime_sharacter",referencedColumnName = "id",foreignKey = @ForeignKey(name = "anime_id"))
    private Anime anime;
    @Column(name = "isdeleted",insertable = false,updatable = false)
    private boolean is_deleted;


    public static Uni<List<Sharacter>> findWithoutAnime(){
        return find("#Sharacter.WithoutAnime").list();
    }
}
