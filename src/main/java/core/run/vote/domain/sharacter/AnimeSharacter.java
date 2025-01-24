package core.run.vote.domain.sharacter;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Table(name = "anime_sharacter")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AnimeSharacter {
    UUID anime_id;

    @Id()
    UUID sharacters_id;


}
