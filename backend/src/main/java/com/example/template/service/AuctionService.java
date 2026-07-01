package com.example.template.service;

import com.example.template.common.enums.EAuctionStatus;
import com.example.template.common.enums.EBidStatus;
import com.example.template.exception.BadRequestException;
import com.example.template.exception.ResourceNotFoundException;
import com.example.template.dto.request.AuctionFilterRequest;
import com.example.template.dto.request.AuctionRequest;
import com.example.template.dto.request.BidRequest;
import com.example.template.dto.response.AuctionResponse;
import com.example.template.dto.response.BidResponse;
import com.example.template.dto.response.PageResponse;
import com.example.template.model.*;
import com.example.template.repository.AuctionCategoryRepository;
import com.example.template.repository.AuctionRepository;
import com.example.template.repository.BidRepository;
import com.example.template.repository.UserRepository;
import com.example.template.repository.SellerRepository;
import com.example.template.repository.specification.AuctionSpecification;
import com.example.template.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

@Service
@RequiredArgsConstructor
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final AuctionCategoryRepository auctionCategoryRepository;
    private final BidRepository bidRepository;
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final NotificationService notificationService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public PageResponse<AuctionResponse> getAuctions(AuctionFilterRequest request) {
        Sort sort = Sort.by(Sort.Direction.fromString(request.getSortDirection()), request.getSortBy());
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize(), sort);

        Page<Auction> auctionPage = auctionRepository.findAll(AuctionSpecification.filterBy(
                request.getCategories(),
                request.getMinBudget(),
                request.getMaxBudget(),
                request.getStatus(),
                request.getDeadline(),
                request.getSearch()
        ), pageable);

        List<AuctionResponse> responses = auctionPage.getContent().stream()
                .map(this::mapToAuctionResponse)
                .collect(Collectors.toList());

        return PageResponse.<AuctionResponse>builder()
                .data(responses)
                .totalItems(auctionPage.getTotalElements())
                .totalPages(auctionPage.getTotalPages())
                .page(auctionPage.getNumber() + 1)
                .pageSize(auctionPage.getSize())
                .build();
    }

    public AuctionResponse getAuctionById(Long id) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));
        return mapToAuctionResponse(auction);
    }
    
    public AuctionResponse getAuctionBySlug(String slug) {
        Auction auction = auctionRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));
        return mapToAuctionResponse(auction);
    }

    @Transactional
    public AuctionResponse createAuction(AuctionRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User buyer = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        AuctionCategory category = auctionCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Auction auction = new Auction();
        auction.setBuyer(buyer);
        auction.setCategory(category);
        auction.setTitle(request.getTitle());
        auction.setSlug(generateSlug(request.getTitle()));
        auction.setDescription(request.getDescription());
        auction.setBudgetMin(request.getBudgetMin());
        auction.setBudgetMax(request.getBudgetMax());
        auction.setDeadline(request.getDeadline());
        try {
            auction.setSkills(objectMapper.writeValueAsString(request.getSkills()));
            auction.setPreferredTechStack(objectMapper.writeValueAsString(request.getPreferredTechStack()));
        } catch (Exception e) {
            auction.setSkills("[]");
            auction.setPreferredTechStack("[]");
        }
        auction.setStatus(EAuctionStatus.OPEN);

        Auction savedAuction = auctionRepository.save(auction);
        return mapToAuctionResponse(savedAuction);
    }

    @Transactional
    public AuctionResponse updateAuction(Long id, AuctionRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));

        if (!auction.getBuyer().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Only the auction buyer can update this auction");
        }

        AuctionCategory category = auctionCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        auction.setCategory(category);
        auction.setTitle(request.getTitle());
        auction.setDescription(request.getDescription());
        auction.setBudgetMin(request.getBudgetMin());
        auction.setBudgetMax(request.getBudgetMax());
        auction.setDeadline(request.getDeadline());
        try {
            auction.setSkills(objectMapper.writeValueAsString(request.getSkills()));
            auction.setPreferredTechStack(objectMapper.writeValueAsString(request.getPreferredTechStack()));
        } catch (Exception e) {
            // Log error
        }

        Auction savedAuction = auctionRepository.save(auction);
        return mapToAuctionResponse(savedAuction);
    }

    @Transactional
    public void deleteAuction(Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));

        if (!auction.getBuyer().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Only the auction buyer can delete this auction");
        }

        if (auction.getStatus() != EAuctionStatus.OPEN) {
            throw new BadRequestException("Cannot delete auction after a bid has been accepted");
        }

        auctionRepository.delete(auction);
    }

    @Transactional
    public BidResponse placeBid(BidRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                
        Seller bidder = sellerRepository.findByUserId(user.getId())
                .orElseThrow(() -> new BadRequestException("Only sellers can place bids"));

        Auction auction = auctionRepository.findById(request.getAuctionId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));

        if (auction.getStatus() != EAuctionStatus.OPEN) {
            throw new BadRequestException("Auction is not open for bidding");
        }
        
        if (auction.getDeadline().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Auction deadline has passed");
        }

        Bid bid = new Bid();
        bid.setAuction(auction);
        bid.setBidder(bidder);
        bid.setPrice(request.getPrice());
        bid.setDeliveryDays(request.getDeliveryDays());
        bid.setCoverLetter(request.getCoverLetter());
        bid.setStatus(EBidStatus.PENDING);

        Bid savedBid = bidRepository.save(bid);
        
        // Gửi thông báo cho người đăng bài (buyer)
        String notificationTitle = "Có seller mới tham gia đấu thầu!";
        String notificationMessage = String.format("Seller %s vừa đặt giá $%s cho dự án '%s' của bạn.", 
                bidder.getUser().getUsername(), 
                request.getPrice(), 
                auction.getTitle());
        String actionUrl = "/auctions/" + auction.getSlug();
                
        notificationService.sendNotification(auction.getBuyer(), notificationTitle, notificationMessage, actionUrl);
        
        return mapToBidResponse(savedBid);
    }
    
    public List<BidResponse> getBidsForAuction(Long auctionId) {
        List<Bid> bids = bidRepository.findByAuctionId(auctionId);
        return bids.stream().map(this::mapToBidResponse).collect(Collectors.toList());
    }

    @Transactional
    public BidResponse acceptBid(Long bidId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Bid bid = bidRepository.findById(bidId)
                .orElseThrow(() -> new ResourceNotFoundException("Bid not found"));

        Auction auction = bid.getAuction();
        
        if (!auction.getBuyer().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Only the auction buyer can accept a bid");
        }
        
        if (auction.getStatus() != EAuctionStatus.OPEN) {
            throw new BadRequestException("Auction is no longer open");
        }

        bid.setStatus(EBidStatus.ACCEPTED);
        Bid savedBid = bidRepository.save(bid);
        
        // Also update auction status
        auction.setStatus(EAuctionStatus.IN_PROGRESS);
        auctionRepository.save(auction);
        
        // Notify the seller
        String notificationTitle = "Trúng thầu dự án!";
        String notificationMessage = String.format("Chúc mừng! %s vừa chấp nhận lời đề nghị của bạn cho dự án '%s'.", 
                currentUser.getUsername(), 
                auction.getTitle());
        String actionUrl = "/auctions/" + auction.getSlug();
                
        notificationService.sendNotification(bid.getBidder().getUser(), notificationTitle, notificationMessage, actionUrl);
        
        // Reject all other bids? (Optional business logic)
        
        return mapToBidResponse(savedBid);
    }

    private AuctionResponse mapToAuctionResponse(Auction auction) {
        AuctionResponse response = new AuctionResponse();
        response.setId(auction.getId());
        response.setBuyerId(auction.getBuyer().getId());
        response.setBuyerUsername(auction.getBuyer().getUsername());
        response.setBuyerAvatarUrl(auction.getBuyer().getAvatarUrl());
        response.setCategoryId(auction.getCategory().getId());
        response.setCategoryName(auction.getCategory().getName());
        response.setTitle(auction.getTitle());
        response.setSlug(auction.getSlug());
        response.setDescription(auction.getDescription());
        response.setBudgetMin(auction.getBudgetMin());
        response.setBudgetMax(auction.getBudgetMax());
        response.setDeadline(auction.getDeadline());
        try {
            response.setSkills(objectMapper.readValue(auction.getSkills(), new TypeReference<List<String>>(){}));
            response.setPreferredTechStack(objectMapper.readValue(auction.getPreferredTechStack(), new TypeReference<List<String>>(){}));
        } catch (Exception e) {
            response.setSkills(List.of());
            response.setPreferredTechStack(List.of());
        }
        response.setStatus(auction.getStatus());
        response.setCreatedAt(auction.getCreatedAt());
        // We'll set bids count to 0 for now unless we do a separate query or bidirectional mapping
        response.setBidsCount(0);
        return response;
    }
    
    private BidResponse mapToBidResponse(Bid bid) {
        BidResponse response = new BidResponse();
        response.setId(bid.getId());
        response.setAuctionId(bid.getAuction().getId());
        response.setBidderId(bid.getBidder().getId());
        response.setBidderUsername(bid.getBidder().getUser().getUsername());
        response.setBidderAvatarUrl(bid.getBidder().getUser().getAvatarUrl());
        response.setPrice(bid.getPrice());
        response.setDeliveryDays(bid.getDeliveryDays());
        response.setCoverLetter(bid.getCoverLetter());
        response.setStatus(bid.getStatus());
        response.setCreatedAt(bid.getCreatedAt());
        return response;
    }

    private String generateSlug(String title) {
        return java.util.UUID.randomUUID().toString();
    }
}
