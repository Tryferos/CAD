package io.github.mixaniki.exception.model;

import org.springframework.http.HttpStatus;

public abstract class AbstractException extends Exception{

    public AbstractException() {
    }


    public AbstractException(String message) {
        super(message);
    }

    public AbstractException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract HttpStatus getStatusCode();

}
