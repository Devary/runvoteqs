package core.run.vote;

import io.smallrye.mutiny.subscription.UniEmitter;

public class SharacterUniEmmiter implements UniEmitter {
    @Override
    public void complete(Object o) {

    }

    @Override
    public void fail(Throwable throwable) {

    }

    @Override
    public UniEmitter onTermination(Runnable runnable) {
        return null;
    }
}
