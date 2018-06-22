package sample.entity

import org.hibernate.validator.constraints.Length
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "chat_rooms")
data class ChatRoom (
        @NotNull
        @Length(min = 3, max = 256)
        var name: String,

        @NotNull
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        var user: User,

        @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.EAGER)
        @JoinColumn(name = "chat_room_id")
        @OrderBy("id desc")
        var chats: List<Chat> = listOf(),

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = -1
)