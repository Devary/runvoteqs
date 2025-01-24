package core.run.vote.domain.poll.schema.votinggroup;

import com.google.protobuf.Empty;
import core.run.vote.VotingGroupRequest;
import core.run.vote.VotingGroupResponse;
import core.run.vote.VotingGroupService;
import io.quarkus.grpc.GrpcService;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

@GrpcService
public class VotingGroupGrpcService implements VotingGroupService {

    @Override
    public Multi<VotingGroupResponse> findAll(Empty request) {
        return null;
    }

    @Override
    public Uni<VotingGroupResponse> findOne(VotingGroupRequest request) {
        return null;
    }

    @Override
    public Multi<VotingGroupResponse> findMany(Multi<VotingGroupRequest> request) {
        return null;
    }
}
