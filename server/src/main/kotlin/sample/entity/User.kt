package sample.entity

import org.hibernate.validator.constraints.Length
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "users")
data class User(
        @NotNull
        var username: String,

        @NotNull
        @Length(min = 60, max = 60)
        var passwordHash: String,

        @NotNull
        var enable: Boolean,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = -1
)