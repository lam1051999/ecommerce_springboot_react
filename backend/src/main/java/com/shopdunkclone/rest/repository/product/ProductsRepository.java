package com.shopdunkclone.rest.repository.product;

import com.shopdunkclone.rest.model.product.ProductType;
import com.shopdunkclone.rest.model.product.ProductsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsRepository extends PagingAndSortingRepository<ProductsEntity, String> {
    Page<ProductsEntity> findAllByProductTypeAndNameNotNull(ProductType productType, Pageable paging);
    Page<ProductsEntity> findAllByProductTypeAndProductSubTypeAndNameNotNull(ProductType productType, String productSubType, Pageable paging);
    ProductsEntity findProductsEntityByIdAndNameNotNull(String id);
}
