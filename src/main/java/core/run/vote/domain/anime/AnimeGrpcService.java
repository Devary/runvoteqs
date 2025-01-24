package core.run.vote.domain.anime;

import com.google.protobuf.Empty;
import core.run.vote.AnimeRequest;
import core.run.vote.AnimeResponse;
import core.run.vote.AnimeService;
import io.quarkus.grpc.GrpcService;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

@GrpcService
public class AnimeGrpcService implements AnimeService {

    @Override
    public Multi<AnimeResponse> findAll(Empty request) {
        return null;
    }

    @Override
    public Uni<AnimeResponse> findOne(AnimeRequest request) {
        return null;
    }

    @Override
    public Multi<AnimeResponse> findMany(Multi<AnimeRequest> request) {
        return null;
    }
}
