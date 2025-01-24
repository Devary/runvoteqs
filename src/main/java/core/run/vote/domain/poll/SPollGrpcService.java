package core.run.vote.domain.poll;

import com.google.protobuf.Empty;
import core.run.vote.*;
import io.quarkus.grpc.GrpcService;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

@GrpcService
public class SPollGrpcService implements SPollService {

    @Override
    public Multi<SPollResponse> findAll(Empty request) {
        return null;
    }

    @Override
    public Uni<SPollResponse> findOne(SPollRequest request) {
        return null;
    }

    @Override
    public Multi<SPollResponse> findMany(Multi<SPollRequest> request) {
        return null;
    }
}
