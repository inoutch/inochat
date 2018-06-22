package sample.service

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import sample.repository.ChatRepository
import sample.repository.ChatRoomRepository

@Transactional
@Service
open class ChatService(private val chatRoomRepository: ChatRoomRepository,
                  private val chatRepository: ChatRepository) {
    fun removeChatRoom(chatRoomId: Int) {
        chatRepository.deleteAllByChatRoomId(chatRoomId)
        chatRepository.flush()
        chatRoomRepository.deleteById(chatRoomId)
    }
}