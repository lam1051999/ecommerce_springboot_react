package com.shopdunkclone.rest.service.address;

import com.shopdunkclone.rest.dto.address.ProvinceAddressDto;
import com.shopdunkclone.rest.model.ServiceResult;
import com.shopdunkclone.rest.model.address.ProvincesEntity;
import com.shopdunkclone.rest.model.address.ShopdunkShopsEntity;
import com.shopdunkclone.rest.repository.address.ProvincesRepository;
import com.shopdunkclone.rest.repository.address.ShopdunkShopsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {
    @Autowired
    ProvincesRepository provincesRepository;

    @Autowired
    ShopdunkShopsRepository shopdunkShopsRepository;

    public ServiceResult<List<ProvinceAddressDto>> getProvinceAddress() {
        List<ProvincesEntity> provincesEntities = provincesRepository.findAll();
        List<ShopdunkShopsEntity> shopdunkShopsEntities = shopdunkShopsRepository.findAll();
        List<ProvinceAddressDto> provinceAddressDtos = provincesEntities.stream().map(item -> {
           String provinceId = item.getId();
           List<ShopdunkShopsEntity> matchedShops = shopdunkShopsEntities.stream().filter(shop -> shop.getProvinceId().equals(provinceId)).toList();
           return new ProvinceAddressDto(provinceId, item.getProvinceName(), item.getDistrictName(), matchedShops);
        }).toList();
        return new ServiceResult<>(ServiceResult.Status.SUCCESS, "OK", provinceAddressDtos);
    }
}
