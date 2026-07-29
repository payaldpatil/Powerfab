package com.powerfab.backend.service;

import com.powerfab.backend.entity.InvoiceDocument;
import com.powerfab.backend.repository.InvoiceDocumentRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class InvoicePDFService {

    private final InvoiceDocumentRepository repository;


    @Value("${powerfab.invoice.upload-dir}")
    private String uploadDirectory;


    public InvoicePDFService(InvoiceDocumentRepository repository) {

        this.repository = repository;

    }


    // =========================
    // UPLOAD PDF
    // =========================

    public InvoiceDocument uploadPDF(MultipartFile file) throws IOException {


        // Check file
        if (file == null || file.isEmpty()) {

            throw new IllegalArgumentException(
                    "Please select a PDF file."
            );

        }


        // Check PDF type
        String contentType = file.getContentType();


        if (contentType == null ||
                !contentType.equalsIgnoreCase("application/pdf")) {


            throw new IllegalArgumentException(
                    "Only PDF files are allowed."
            );

        }



        // Create upload folder

        Path uploadPath = Paths.get(uploadDirectory);


        if (!Files.exists(uploadPath)) {

            Files.createDirectories(uploadPath);

        }



        // Get original file name

        String fileName = file.getOriginalFilename();



        // If filename is empty

        if (fileName == null || fileName.trim().isEmpty()) {

            fileName = "invoice.pdf";

        }



        // Remove unwanted path from filename

        fileName = Paths.get(fileName)
                .getFileName()
                .toString();



        // Final file location

        Path filePath = uploadPath.resolve(fileName);



        // Save PDF file

        Files.copy(

                file.getInputStream(),

                filePath,

                StandardCopyOption.REPLACE_EXISTING

        );



        // Save database data

        InvoiceDocument document = new InvoiceDocument();


        document.setFileName(fileName);


        document.setFilePath(
                filePath.toString()
        );


        document.setUploadDate(
                LocalDateTime.now()
        );



        return repository.save(document);

    }



    // =========================
    // GET ALL PDF RECORDS
    // =========================

    public List<InvoiceDocument> getAllPDFs() {

        return repository.findAll();

    }



    // =========================
    // GET PDF BY ID
    // =========================

    public InvoiceDocument getPDFById(Long id) {


        return repository.findById(id)

                .orElseThrow(() ->
                        new RuntimeException(
                                "PDF not found."
                        )
                );

    }

}