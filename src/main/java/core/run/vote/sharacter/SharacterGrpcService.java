package core.run.vote.sharacter;

import com.google.protobuf.Empty;
import core.run.vote.SharacterRequest;
import core.run.vote.SharacterResponse;
import core.run.vote.SharacterService;
import io.quarkus.grpc.GrpcService;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

@GrpcService
public class SharacterGrpcService implements SharacterService {

    @Override
    public Multi<SharacterResponse> findAll(Empty request) {
        return null;
    }

    @Override
    public Uni<SharacterResponse> findOne(SharacterRequest request) {
        return null;
    }

    @Override
    public Multi<SharacterResponse> findMany(Multi<SharacterRequest> request) {
        return null;
    }
}
