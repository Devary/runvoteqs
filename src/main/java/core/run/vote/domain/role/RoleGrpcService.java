package core.run.vote.domain.role;

import com.google.protobuf.Empty;
import core.run.vote.RoleRequest;
import core.run.vote.RoleResponse;
import core.run.vote.RoleService;
import io.quarkus.grpc.GrpcService;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;

@GrpcService
public class RoleGrpcService implements RoleService {

    @Override
    public Multi<RoleResponse> findAll(Empty request) {
        return null;
    }

    @Override
    public Uni<RoleResponse> findOne(RoleRequest request) {
        return null;
    }

    @Override
    public Multi<RoleResponse> findMany(Multi<RoleRequest> request) {
        return null;
    }
}
