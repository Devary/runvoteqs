package core.run.vote.cqrs.query;

import java.util.UUID;

public record SharacterQuery(UUID id, String name, String description, String role) {
}
