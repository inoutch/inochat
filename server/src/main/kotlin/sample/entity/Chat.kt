package sample.entity

import org.hibernate.validator.constraints.Length
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "chats")
data class Chat(
        @NotNull
        @Length(min = 1, max = 1024)
        var message: String,

        @NotNull
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        var user: User,

        @NotNull
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "chat_room_id")
        var chatRoom: ChatRoom,

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Int = -1
)