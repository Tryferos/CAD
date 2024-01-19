package io.github.mixaniki.controller;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;



@Component
public class StaticContentFilter implements Filter {

    private static final HashMap<String, String> files = new HashMap<>();

    static {
        files.put(".js", "application/javascript");
        files.put(".css", "text/css");
        files.put(".csv", "text/html");
        files.put(".svg", "image/svg+xml");
        files.put(".eot", "text/html");
        files.put(".ttf", "font/ttf");
        files.put(".woff", "font/woff");
        files.put(".appcache", "text/html");
        files.put(".png", "image/png");
        files.put(".jpg", "image/jpg");
        files.put(".gif", "image/gif");
        files.put(".jpef", "image/jpeg");
        files.put(".ico", "text/html");
        files.put(".default", "text/html");
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String path = request.getServletPath();

        boolean isApi = path.startsWith("/api");
        boolean isResourceFile = !isApi && files.keySet().stream().anyMatch(path::contains);;
        String extension = ".default";
        String[] split = path.split("\\.");
        if(isResourceFile && split.length>0){
             extension = ".".concat(split[split.length-1]);
        }

        if (isApi) {
            chain.doFilter(request, response);
        } else if (isResourceFile) {
            response.setHeader("Content-Type", files.get(extension)+"; charset=UTF-8");
            resourceToResponse("static" + path, response);
        } else {
            response.setHeader("Content-Type", "text/html; charset=UTF-8");
            resourceToResponse("static/index.html", response);
        }
    }

    private void resourceToResponse(String resourcePath, HttpServletResponse response) throws IOException {
        InputStream inputStream = Thread.currentThread()
                .getContextClassLoader()
                .getResourceAsStream(resourcePath);

        if (inputStream == null) {
            response.sendError(404, "{message: \"not found\"}");
            return;
        }

        inputStream.transferTo(response.getOutputStream());
    }
}