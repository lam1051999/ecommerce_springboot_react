package com.shopdunkclone.rest.model;

import java.io.Serializable;

public class ServiceResult<T> implements Serializable {
    private Status status;
    private String message;
    private T data;

    public ServiceResult(Status status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public ServiceResult() {
    }

    public enum Status {
        SUCCESS, FAILED
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
