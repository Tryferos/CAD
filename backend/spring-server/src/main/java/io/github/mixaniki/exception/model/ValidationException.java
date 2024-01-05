package io.github.mixaniki.exception.model;

import org.springframework.http.HttpStatus;

    public class ValidationException extends AbstractException {
        public ValidationException() {
        }

        public ValidationException(String message) {
            super(message);
        }

        public ValidationException(String message, Throwable cause) {
            super(message, cause);
        }

        @Override
        public HttpStatus getStatusCode() {
            return HttpStatus.BAD_REQUEST;
        }


    }

