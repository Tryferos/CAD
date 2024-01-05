package io.github.mixaniki.exception.model;

import org.springframework.http.HttpStatus;

//@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotFoundException extends AbstractException {

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.NOT_FOUND;
    }
}
