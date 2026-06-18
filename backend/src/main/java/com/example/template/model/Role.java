package com.example.template.model;

import com.example.template.common.enums.ERole;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
public class Role extends AbstractEntity<Long> {

    @Column(nullable = false, unique = true, name = "name")
    @Enumerated(EnumType.STRING)
    private ERole name;

    @Column(length = 500, name = "description")
    private String description;
}
