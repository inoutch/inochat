package sample.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import sample.entity.ChatRoom

@Repository
interface ChatRoomRepository : JpaRepository<ChatRoom, Int>