package core.run.vote.sharacter;

public enum SharacterRole {
    HERO(){
        @Override
        public String toString(){
            return "Hero";
        }
    },
    VILLAIN(){
        @Override
        public String toString(){
            return "Villain";
        }
    },

}
