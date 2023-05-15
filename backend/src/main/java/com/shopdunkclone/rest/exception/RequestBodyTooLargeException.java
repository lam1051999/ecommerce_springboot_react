package com.shopdunkclone.rest.exception;

public class RequestBodyTooLargeException extends Exception {
    public RequestBodyTooLargeException() {
        super();
    }

    public RequestBodyTooLargeException(String message) {
        super(message);
    }

    public RequestBodyTooLargeException(String message, Throwable cause) {
        super(message, cause);
    }

    public RequestBodyTooLargeException(Throwable cause) {
        super(cause);
    }

    public RequestBodyTooLargeException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
