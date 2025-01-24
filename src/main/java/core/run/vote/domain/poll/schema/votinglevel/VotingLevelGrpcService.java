package core.run.vote.domain.poll.schema.votinglevel;

import com.google.protobuf.Empty;
import core.run.vote.*;
import io.quarkus.grpc.GrpcService;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

@GrpcService
public class VotingLevelGrpcService implements VotingLevelService {

    @Override
    public Multi<VotingLevelResponse> findAll(Empty request) {
        return null;
    }

    @Override
    public Uni<VotingLevelResponse> findOne(VotingLevelRequest request) {
        return null;
    }

    @Override
    public Multi<VotingLevelResponse> findMany(Multi<VotingLevelRequest> request) {
        return null;
    }
}
