package com.shopdunkclone.rest.exception;

public class NotFoundRecordException extends Exception {
    public NotFoundRecordException() {
        super();
    }

    public NotFoundRecordException(String message) {
        super(message);
    }

    public NotFoundRecordException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundRecordException(Throwable cause) {
        super(cause);
    }

    public NotFoundRecordException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
