package sample.graphql

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import org.springframework.stereotype.Component
import sample.entity.ChatRoom
import sample.entity.User
import sample.extention.orNull
import sample.repository.ChatRoomRepository
import sample.repository.TokenRepository
import sample.repository.UserRepository
import java.util.*

@Component
class Query(
        private val userRepository: UserRepository,
        private val tokenRepository: TokenRepository,
        private val chatRoomRepository: ChatRoomRepository) : GraphQLQueryResolver {
    fun version() = "1.0.0"

    fun findAllChatRooms(): List<ChatRoom> {
        return chatRoomRepository.findAll()
    }

    fun getChatRoom(id: Int): ChatRoom? {
        return chatRoomRepository.findById(id).orNull()
    }

    fun getUser(token: String): User? {
        val userId = tokenRepository.getUserId(UUID.fromString(token)) ?: return null
        return userRepository.findById(userId).orNull()
    }
}