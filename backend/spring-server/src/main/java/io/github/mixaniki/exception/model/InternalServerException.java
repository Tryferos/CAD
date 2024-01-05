package io.github.mixaniki.exception.model;

import org.springframework.http.HttpStatus;

public class InternalServerException extends AbstractException {

    public InternalServerException() {
    }

    public InternalServerException(String message) {
        super(message);
    }

    public InternalServerException(String message, Throwable cause) {
        super(message, cause);
    }

    @Override
    public HttpStatus getStatusCode() {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
