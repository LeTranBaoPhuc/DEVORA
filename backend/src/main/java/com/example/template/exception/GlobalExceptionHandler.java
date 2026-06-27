package com.example.template.exception;

import com.example.template.common.i18n.MessageService;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.UnexpectedTypeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Date;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final MessageService messageService;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ConstraintViolationException.class,
            MissingServletRequestParameterException.class, MethodArgumentNotValidException.class, UnexpectedTypeException.class})
    public ErrorResponse handleValidationException(Exception e, WebRequest request) {
        if (e instanceof MethodArgumentNotValidException methodArgumentNotValidException) {
            FieldError fieldError = methodArgumentNotValidException.getBindingResult().getFieldErrors().stream()
                    .findFirst()
                    .orElse(null);
            String message = fieldError != null
                    ? fieldError.getDefaultMessage()
                    : messageService.getMessage("error.validation.failed");
            return buildErrorResponse(BAD_REQUEST, request, messageService.getMessage("error.invalid_payload"), message);
        }

        if (e instanceof MissingServletRequestParameterException missingParameterException) {
            return buildErrorResponse(
                    BAD_REQUEST,
                    request,
                    messageService.getMessage("error.invalid_parameter"),
                    messageService.getMessage("error.request.parameter.required", missingParameterException.getParameterName())
            );
        }

        if (e instanceof ConstraintViolationException constraintViolationException) {
            String message = constraintViolationException.getConstraintViolations().stream()
                    .findFirst()
                    .map(violation -> violation.getMessage())
                    .orElse(messageService.getMessage("error.validation.failed"));
            return buildErrorResponse(BAD_REQUEST, request, messageService.getMessage("error.invalid_parameter"), message);
        }

        return buildErrorResponse(BAD_REQUEST, request,
                messageService.getMessage("error.invalid_data"),
                messageService.resolveMessageOrKey(e.getMessage()));
    }

    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ErrorResponse handleResourceNotFoundException(ResourceNotFoundException e, WebRequest request) {
        return buildErrorResponse(NOT_FOUND, request, NOT_FOUND.getReasonPhrase(), messageService.resolveMessageOrKey(e.getMessage()));
    }

    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler(UsernameNotFoundException.class)
    public ErrorResponse handleUsernameNotFoundException(UsernameNotFoundException e, WebRequest request) {
        return buildErrorResponse(NOT_FOUND, request, NOT_FOUND.getReasonPhrase(), messageService.resolveMessageOrKey(e.getMessage()));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BadRequestException.class)
    public ErrorResponse handleBadRequestException(BadRequestException e, WebRequest request) {
        return buildErrorResponse(HttpStatus.BAD_REQUEST, request,
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                messageService.resolveMessageOrKey(e.getMessage()));
    }

    @ResponseStatus(CONFLICT)
    @ExceptionHandler(InvalidDataException.class)
    public ErrorResponse handleDuplicateKeyException(InvalidDataException e, WebRequest request) {
        return buildErrorResponse(CONFLICT, request, CONFLICT.getReasonPhrase(), messageService.resolveMessageOrKey(e.getMessage()));
    }


    @ResponseStatus(UNAUTHORIZED)
    @ExceptionHandler(BadCredentialsException.class)
    public ErrorResponse handleBadCredentialsException(Exception e, WebRequest request) {
        return buildErrorResponse(UNAUTHORIZED, request,
                UNAUTHORIZED.getReasonPhrase().toUpperCase(),
                messageService.getMessage("auth.bad_credentials"));
    }

    @ResponseStatus(UNAUTHORIZED)
    @ExceptionHandler(org.springframework.security.authentication.DisabledException.class)
    public ErrorResponse handleDisabledException(Exception e, WebRequest request) {
        return buildErrorResponse(UNAUTHORIZED, request,
                UNAUTHORIZED.getReasonPhrase().toUpperCase(),
                messageService.getMessage("auth.account_disabled"));
    }

    @ResponseStatus(UNAUTHORIZED)
    @ExceptionHandler(JwtAuthenticationException.class)
    public ErrorResponse handleJwtAuthenticationException(JwtAuthenticationException e, WebRequest request) {
        return buildErrorResponse(UNAUTHORIZED, request,
                UNAUTHORIZED.getReasonPhrase(),
                messageService.resolveMessageOrKey(e.getMessage()));
    }

    @ResponseStatus(FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    public ErrorResponse handleAccessDeniedException(AccessDeniedException e, WebRequest request) {
        return buildErrorResponse(FORBIDDEN, request,
                FORBIDDEN.getReasonPhrase(),
                messageService.resolveMessageOrKey(e.getMessage()));
    }

    @ResponseStatus(INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse handleException(Exception e, WebRequest request) {
        return buildErrorResponse(INTERNAL_SERVER_ERROR, request,
                INTERNAL_SERVER_ERROR.getReasonPhrase(),
                messageService.resolveMessageOrKey(e.getMessage()));
    }

    private ErrorResponse buildErrorResponse(HttpStatus status, WebRequest request, String error, String message) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setTimestamp(new Date());
        errorResponse.setPath(request.getDescription(false).replace("uri=", ""));
        errorResponse.setStatus(status.value());
        errorResponse.setError(error);
        errorResponse.setMessage(message);
        return errorResponse;
    }
}
