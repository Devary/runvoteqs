package core.run.vote.sql;

public class NamedQueryList {
    public static final String SHARACTERS_WITHOUT_ANIME =  "select c from Sharacter c left join AnimeSharacter ac on c.id = ac.sharacters_id where ac.sharacters_id is null and is_deleted = false";
}
