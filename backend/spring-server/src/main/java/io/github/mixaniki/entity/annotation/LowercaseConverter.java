package io.github.mixaniki.entity.annotation;


import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 *  LowercaseConverter class converts fields type String into lowercase in the database
 */
@Converter
public class LowercaseConverter implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return (attribute == null) ? null : attribute.toLowerCase();
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return (dbData == null) ? null : dbData.toLowerCase();
    }
}

