package core.run.vote.cqrs.command;


import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SharacterCommand {
    private UUID id;
    private String name;
    private String description;
    private String role;
}
