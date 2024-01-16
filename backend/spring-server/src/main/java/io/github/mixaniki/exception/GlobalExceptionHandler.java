package io.github.mixaniki.exception;

import io.github.mixaniki.exception.model.AbstractException;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Path;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;


@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = { Exception.class })
    protected ResponseEntity<Object> handle(Exception ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @ExceptionHandler(value = { RuntimeException.class })
    protected ResponseEntity<Object> handle(RuntimeException ex, WebRequest request) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @ExceptionHandler(value = { AbstractException.class })
    protected ResponseEntity<Object> handle(AbstractException ex, WebRequest request) {
        return ResponseEntity.status(ex.getStatusCode()).body(new ErrorBody(ex.getMessage()));
    }


    /**
     * Handles exception usually thrown cause of unique constraint violation (from database) but not only
     *
     * @param ex  The occurred exception
     * @return    Returns appropriate response status code and exception message
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handle(DataIntegrityViolationException ex) {

        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorBody(ex.getMessage()));
    }

    @ExceptionHandler(value = { ConstraintViolationException.class })
    protected ResponseEntity<Object> handle(ConstraintViolationException ex, WebRequest request) {
        final String errorMessage = ex.getConstraintViolations().stream()
                .map(violation -> {
                    String field = null;
                    for (Path.Node node : violation.getPropertyPath()) {
                        field = node.getName();
                    }
                    return field + ": " + violation.getMessage();
                })
                .collect(Collectors.joining(", "));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorBody(errorMessage));
    }

    @ExceptionHandler(value = { AccessDeniedException.class })
    protected ResponseEntity<Object> handle(AccessDeniedException ex, WebRequest request, Authentication Authentication) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    public record ErrorBody(String message){}

}
