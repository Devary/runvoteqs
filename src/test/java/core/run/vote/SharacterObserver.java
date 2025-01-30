package core.run.vote;

import io.quarkus.grpc.stubs.UniStreamObserver;
import io.smallrye.mutiny.subscription.UniEmitter;

public class SharacterObserver extends UniStreamObserver {
    public SharacterObserver(UniEmitter emitter) {
        super(emitter);
    }
}
