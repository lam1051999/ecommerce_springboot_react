package com.shopdunkclone.rest.repository.product;

import com.shopdunkclone.rest.model.product.ProductType;
import com.shopdunkclone.rest.model.product.ProductsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductsRepository extends PagingAndSortingRepository<ProductsEntity, String> {
    Page<ProductsEntity> findAllByProductTypeAndNameNotNull(ProductType productType, Pageable paging);
    Page<ProductsEntity> findAllByProductTypeAndProductSubTypeAndNameNotNull(ProductType productType, String productSubType, Pageable paging);
    @Query(value = """
            SELECT * FROM `products`
            WHERE MATCH (`name`) AGAINST (:search_text IN NATURAL LANGUAGE MODE)
            AND `name` IS NOT NULL""", nativeQuery = true)
    Page<ProductsEntity> searchProducts(@Param("search_text") String searchText, Pageable paging);
    Optional<ProductsEntity> findProductsEntityByIdAndNameNotNull(String id);
}
