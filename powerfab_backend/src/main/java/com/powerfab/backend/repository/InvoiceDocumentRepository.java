package com.powerfab.backend.repository;

import com.powerfab.backend.entity.InvoiceDocument;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceDocumentRepository extends JpaRepository<InvoiceDocument, Long> {

}