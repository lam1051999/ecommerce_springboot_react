package com.shopdunkclone.rest.logging;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;
import org.springframework.web.util.WebUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

public class LoggableDispatcherServlet extends DispatcherServlet {

    private static final Logger logger = LoggerFactory.getLogger("HttpLogger");

    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
        ContentCachingRequestWrapper requestWrapper = null;
        ContentCachingResponseWrapper responseWrapper = null;
        if (request instanceof ContentCachingRequestWrapper) {
            requestWrapper = (ContentCachingRequestWrapper) request;
        } else requestWrapper = new ContentCachingRequestWrapper(request);
        if (response instanceof ContentCachingResponseWrapper) {
            responseWrapper = (ContentCachingResponseWrapper) response;
        } else responseWrapper = new ContentCachingResponseWrapper(response);
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("GMT+7"));
        Date requestTime = calendar.getTime();
        Instant start = Instant.now();
        try {
            super.doDispatch(requestWrapper, responseWrapper);
        } finally {
            ObjectNode rootNode = mapper.createObjectNode();
            String id = requestWrapper.getRemoteAddr() + "-" + requestTime.getTime();

            // log request
            String path = request.getRequestURI();
            if("/error".equals(path) && requestWrapper.getRequest() != null) {
                Object pathTmp = requestWrapper.getRequest().getAttribute("javax.servlet.forward.request_uri");
                path = pathTmp != null ? pathTmp.toString() : path;
            }
            rootNode.put("id", id);
            rootNode.put("requestTime", requestTime.toString());
            rootNode.put("requestUri", path);
            rootNode.put("clientIp", requestWrapper.getRemoteAddr());
            rootNode.set("requestHeaders", mapper.valueToTree(getRequestHeaders(requestWrapper)));
            String method = requestWrapper.getMethod();
            rootNode.put("httpMethod", method);
            if (method.equals("GET")) {
                rootNode.set("request", mapper.valueToTree(requestWrapper.getParameterMap()));
            } else {
                rootNode.put("request", getBody(requestWrapper));
            }

            // log response
            rootNode.put("httpStatus", responseWrapper.getStatus());
            rootNode.put("queryLatency", Duration.between(start, Instant.now()).toMillis());
            // remove data from response
            try {
                String bodyResponse = getBodyResponse(responseWrapper);
                rootNode.put("response", bodyResponse);
            } catch (Exception e) {
                rootNode.put("response", getResponse(responseWrapper));
            }

            // return response
            responseWrapper.copyBodyToResponse();
            rootNode.set("responseHeaders", mapper.valueToTree(getResponsetHeaders(responseWrapper)));
            if(!requestWrapper.getRequestURI().equals("/api/ping")) logger.info(rootNode.toString());
        }
    }


    private String getBodyResponse(ContentCachingResponseWrapper response) {
        // wrap request to make sure we can read the body of the request (otherwise it will be consumed by the actual
        // request handler)
        ContentCachingResponseWrapper wrapper = WebUtils.getNativeResponse(response, ContentCachingResponseWrapper.class);
        if (wrapper != null) {
            byte[] buf = wrapper.getContentAsByteArray();
            if (buf.length > 0) {
                try {
                    return new String(buf, 0, buf.length, wrapper.getCharacterEncoding());
                } catch (UnsupportedEncodingException ex) {
                    return ex.getCause().getMessage();
                }
            }
        }
        return null;
    }
    private String getBody(ContentCachingRequestWrapper request) {
        // wrap request to make sure we can read the body of the request (otherwise it will be consumed by the actual
        // request handler)
        ContentCachingRequestWrapper wrapper = WebUtils.getNativeRequest(request, ContentCachingRequestWrapper.class);
        if (wrapper != null) {
            byte[] buf = wrapper.getContentAsByteArray();
            if (buf.length > 0) {
                try {
                    return new String(buf, 0, buf.length, wrapper.getCharacterEncoding());
                } catch (UnsupportedEncodingException ex) {
                    return ex.getCause().getMessage();
                }
            }
        }
        return null;
    }


    private String getResponse(ContentCachingResponseWrapper res) {
        // wrap request to make sure we can read the body of the request (otherwise it will be consumed by the actual
        // request handler)
        if (res != null) {
            byte[] buf = res.getContentAsByteArray();
            if (buf.length > 0) {
                try {
                    return new String(buf, 0, buf.length, res.getCharacterEncoding());
                } catch (UnsupportedEncodingException ex) {
                    return ex.getCause().getMessage();
                }
            }
        }
        return null;
    }

    private Map<String, Object> getRequestHeaders(HttpServletRequest request) {
        Map<String, Object> headers = new HashMap<>();
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            headers.put(headerName, request.getHeader(headerName));
        }
        return headers;

    }

    private Map<String, Object> getResponsetHeaders(ContentCachingResponseWrapper response) {
        Map<String, Object> headers = new HashMap<>();
        Collection<String> headerNames = response.getHeaderNames();
        for (String headerName : headerNames) {
            headers.put(headerName, response.getHeader(headerName));
        }
        return headers;
    }
}