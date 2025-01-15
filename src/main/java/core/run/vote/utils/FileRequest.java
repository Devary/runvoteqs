package core.run.vote.utils;

import jakarta.ws.rs.core.MediaType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class FileRequest {

    @RestForm
    @PartType(MediaType.TEXT_PLAIN)
    private String name;

    @RestForm
    private FileUpload filename;
}
