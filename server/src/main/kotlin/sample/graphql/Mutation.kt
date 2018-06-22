package sample.graphql

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component
import sample.entity.Chat
import sample.entity.ChatRoom
import sample.entity.User
import sample.extention.orNull
import sample.repository.ChatRepository
import sample.repository.ChatRoomRepository
import sample.repository.UserRepository
import sample.service.ChatService
import sample.service.TokenService
import java.util.*

@Component
open class Mutation(
        private val passwordEncoder: BCryptPasswordEncoder,
        private val userRepository: UserRepository,
        private val chatRepository: ChatRepository,
        private val chatRoomRepository: ChatRoomRepository,
        private val tokenService: TokenService,
        private val chatService: ChatService) : GraphQLMutationResolver {
    fun newUser(username: String, password: String): User {
        if (userRepository.findByUsername(username) != null) {
            throw RuntimeException("user has already been existed")
        }
        val user = User(username, passwordEncoder.encode(password), true)
        return userRepository.save(user)
    }

    fun newChatRoom(token: String, name: String): ChatRoom {
        val user = tokenService.authorize(UUID.fromString(token))
        val chatRoom = ChatRoom(name, user)
        return chatRoomRepository.save(chatRoom)
    }

    fun newChat(token: String, chatRoomId: Int, message: String) : Chat {
        val user = tokenService.authorize(UUID.fromString(token))
        val chatRoom = chatRoomRepository.getOne(chatRoomId)
        val chat = Chat(message, user, chatRoom)
        return chatRepository.save(chat)
    }

    fun removeChatRoom(token: String, charRoomId: Int) {
        val user = tokenService.authorize(UUID.fromString(token))
        val chatRoom = chatRoomRepository.findById(charRoomId).orNull() ?: throw RuntimeException("chat room is null")
        if (user.id != chatRoom.user.id) {
            throw RuntimeException("It is not your room")
        }
        chatService.removeChatRoom(charRoomId)
    }
}