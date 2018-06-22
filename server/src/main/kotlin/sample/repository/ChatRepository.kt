package sample.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import sample.entity.Chat

@Repository
interface ChatRepository : JpaRepository<Chat, Int> {
    // HACK
    @Modifying
    @Query("delete from Chat c where c.chatRoom.id = ?1")
    fun deleteAllByChatRoomId(chatRoomId: Int)
}