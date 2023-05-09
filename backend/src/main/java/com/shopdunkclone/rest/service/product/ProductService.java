package com.shopdunkclone.rest.service.product;

import com.shopdunkclone.rest.dto.product.ProductImagesDto;
import com.shopdunkclone.rest.dto.product.ProductRatingsDto;
import com.shopdunkclone.rest.dto.product.ProductRatingsRequest;
import com.shopdunkclone.rest.dto.product.ProductsDto;
import com.shopdunkclone.rest.exception.NotFoundRecordException;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.product.*;
import com.shopdunkclone.rest.repository.product.ProductImagesRepository;
import com.shopdunkclone.rest.repository.product.ProductInfosRepository;
import com.shopdunkclone.rest.repository.product.ProductRatingsRepository;
import com.shopdunkclone.rest.repository.product.ProductsRepository;
import com.shopdunkclone.rest.util.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private static final Sort randomSort = Sort.by("id").descending();
    private static final Sort priceHighLowSort = Sort.by("actualPrice").descending();
    private static final Sort priceLowHighSort = Sort.by("actualPrice").ascending();
    private static final Sort newestSort = Sort.by("created").descending();
    private static final Sort nameAZSort = Sort.by("name").ascending();
    private static final Sort nameZASort = Sort.by("name").descending();

    @Autowired
    ProductsRepository productsRepository;
    @Autowired
    ProductImagesRepository productImagesRepository;
    @Autowired
    ProductInfosRepository productInfosRepository;
    @Autowired
    ProductRatingsRepository productRatingsRepository;

    public ServiceResult<ProductsDto> getProducts(int page, int size, String sortType, ProductType productType, String productSubType) {
        Sort targetSort = switch (sortType) {
            case "PRICE_HIGH_LOW" -> priceHighLowSort;
            case "PRICE_LOW_HIGH" -> priceLowHighSort;
            case "NEWEST" -> newestSort;
            case "NAME_A_Z" -> nameAZSort;
            case "NAME_Z_A" -> nameZASort;
            default -> randomSort;
        };
        Pageable paging = PageRequest.of(page, size, targetSort);
        List<ProductsEntity> products = new ArrayList<>();
        Page<ProductsEntity> currPage = (productSubType != null) ? productsRepository.findAllByProductTypeAndProductSubTypeAndNameNotNull(productType, productSubType, paging) : productsRepository.findAllByProductTypeAndNameNotNull(productType, paging);
        int totalPages = currPage.getTotalPages();
        long totalElements = currPage.getTotalElements();
        if (!currPage.isEmpty()) {
            products.addAll(currPage.getContent());
        }
        ProductsDto productsDto = new ProductsDto(totalPages, totalElements, products);
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", productsDto);
    }

    public ServiceResult<ProductsEntity> getProductById(String id) throws NotFoundRecordException {
        ProductsEntity productsEntity = productsRepository.findProductsEntityByIdAndNameNotNull(id).orElseThrow(() -> new NotFoundRecordException("Product not found"));
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", productsEntity);
    }

    public ServiceResult<List<ProductImagesDto>> getProductImages(String productId) {
        List<ProductImagesDto> productImagesDtos = new ArrayList<>();
        List<ProductImagesEntity> productImages = productImagesRepository.findAllByProductId(productId);
        Map<String, List<ProductImagesEntity>> groupByColorImages = productImages.stream().collect(Collectors.groupingBy(ProductImagesEntity::getColor));
        for (var entry : groupByColorImages.entrySet()) {
            String color = entry.getKey();
            List<String> list_images = entry.getValue().stream().map(ProductImagesEntity::getSource).toList();
            productImagesDtos.add(new ProductImagesDto(color, list_images));
        }
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", productImagesDtos);
    }

    public ServiceResult<ProductInfosEntity> getProductInfos(String productId) throws NotFoundRecordException {
        ProductInfosEntity productInfos = productInfosRepository.findProductInfosEntityByProductId(productId).orElseThrow(() -> new NotFoundRecordException("Product information not found"));
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", productInfos);
    }

    public ServiceResult<ProductRatingsDto> getProductRatings(String productId) {
        List<ProductRatingsEntity> productRatingsEntities = productRatingsRepository.findAllByProductId(productId);
        int numReviews = productRatingsEntities.size();
        double averageNumStars;
        if(!productRatingsEntities.isEmpty()) {
            averageNumStars = ((double) productRatingsEntities.stream().mapToInt(ProductRatingsEntity::getNumStars).sum()) / numReviews;
        } else {
            averageNumStars = 0;
        }
        int num5Stars = (int) productRatingsEntities.stream().filter(ele -> ele.getNumStars() == 5).count();
        int num4Stars = (int) productRatingsEntities.stream().filter(ele -> ele.getNumStars() == 4).count();
        int num3Stars = (int) productRatingsEntities.stream().filter(ele -> ele.getNumStars() == 3).count();
        int num2Stars = (int) productRatingsEntities.stream().filter(ele -> ele.getNumStars() == 2).count();
        int num1Stars = (int) productRatingsEntities.stream().filter(ele -> ele.getNumStars() == 1).count();
        ProductRatingsDto productRatingsDto = new ProductRatingsDto(
                numReviews, averageNumStars, num5Stars, num4Stars, num3Stars, num2Stars, num1Stars, productRatingsEntities
        );
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", productRatingsDto);
    }
}

