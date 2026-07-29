package com.powerfab.backend.controller;

import com.powerfab.backend.entity.InvoiceDocument;
import com.powerfab.backend.service.InvoicePDFService;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/invoices/pdfs")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoicePDFController {

    private final InvoicePDFService service;

    public InvoicePDFController(InvoicePDFService service) {
        this.service = service;
    }

    // =========================
    // GET ALL PDF RECORDS
    // =========================

    @GetMapping
    public ResponseEntity<List<InvoiceDocument>> getAllPDFs() {

        return ResponseEntity.ok(service.getAllPDFs());

    }

    // =========================
    // UPLOAD PDF
    // =========================

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<InvoiceDocument> uploadPDF(

            @RequestParam("file") MultipartFile file

    ) throws Exception {

        InvoiceDocument savedDocument = service.uploadPDF(file);

        return ResponseEntity.ok(savedDocument);

    }

    // =========================
    // VIEW PDF
    // =========================

    @GetMapping("/{id}/view")
    public ResponseEntity<Resource> viewPDF(
            @PathVariable Long id
    ) throws MalformedURLException {

        InvoiceDocument document = service.getPDFById(id);

        Path path = Paths.get(document.getFilePath());

        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + document.getFileName() + "\""
                )
                .body(resource);
    }

    // =========================
    // DOWNLOAD PDF
    // =========================

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadPDF(
            @PathVariable Long id
    ) throws MalformedURLException {

        InvoiceDocument document = service.getPDFById(id);

        Path path = Paths.get(document.getFilePath());

        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + document.getFileName() + "\""
                )
                .body(resource);
    }
}