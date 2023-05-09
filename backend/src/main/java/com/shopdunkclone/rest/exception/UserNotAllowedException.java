package com.shopdunkclone.rest.exception;

public class UserNotAllowedException extends Exception {
    public UserNotAllowedException() {
        super();
    }

    public UserNotAllowedException(String message) {
        super(message);
    }

    public UserNotAllowedException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotAllowedException(Throwable cause) {
        super(cause);
    }

    public UserNotAllowedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
