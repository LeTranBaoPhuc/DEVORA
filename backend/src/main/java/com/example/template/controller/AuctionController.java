package com.example.template.controller;

import com.example.template.dto.request.AuctionFilterRequest;
import com.example.template.dto.request.AuctionRequest;
import com.example.template.dto.request.BidRequest;
import com.example.template.dto.response.AuctionResponse;
import com.example.template.dto.response.BidResponse;
import com.example.template.dto.response.PageResponse;
import com.example.template.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;

    @GetMapping
    public ResponseEntity<PageResponse<AuctionResponse>> getAuctions(
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) java.math.BigDecimal minBudget,
            @RequestParam(required = false) java.math.BigDecimal maxBudget,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String deadline,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection
    ) {
        AuctionFilterRequest filterRequest = new AuctionFilterRequest(
                categories, minBudget, maxBudget, status, deadline, search, page, size, sortBy, sortDirection
        );
        return ResponseEntity.ok(auctionService.getAuctions(filterRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionResponse> getAuctionById(@PathVariable Long id) {
        return ResponseEntity.ok(auctionService.getAuctionById(id));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<AuctionResponse> getAuctionBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(auctionService.getAuctionBySlug(slug));
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AuctionResponse> createAuction(@RequestBody AuctionRequest request) {
        return ResponseEntity.ok(auctionService.createAuction(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<AuctionResponse> updateAuction(@PathVariable Long id, @RequestBody AuctionRequest request) {
        return ResponseEntity.ok(auctionService.updateAuction(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteAuction(@PathVariable Long id) {
        auctionService.deleteAuction(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/bids")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BidResponse> placeBid(@RequestBody BidRequest request) {
        return ResponseEntity.ok(auctionService.placeBid(request));
    }

    @GetMapping("/{id}/bids")
    public ResponseEntity<List<BidResponse>> getBidsForAuction(@PathVariable Long id) {
        return ResponseEntity.ok(auctionService.getBidsForAuction(id));
    }

    @PostMapping("/bids/{bidId}/accept")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BidResponse> acceptBid(@PathVariable Long bidId) {
        return ResponseEntity.ok(auctionService.acceptBid(bidId));
    }
}
