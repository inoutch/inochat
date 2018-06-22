package sample.repository

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Repository
import sample.entity.Token
import sample.extention.plusDays
import java.util.*

@Repository
class TokenRepository(
        private val redisTemplate: RedisTemplate<String, String>,
        private val objectMapper: ObjectMapper) {
    companion object {
        const val TOKEN_PREFIX = "token-"
    }

    fun getUserId(uuid: UUID): Int? {
        val json = redisTemplate.opsForValue().get(TOKEN_PREFIX + uuid.toString()) ?: return null
        val token = objectMapper.readValue<Token>(json)
        return token.userId
    }

    fun createToken(userId: Int): UUID {
        val uuid = UUID.randomUUID()
        val token = Token(userId, Date().plusDays(7))
        redisTemplate.opsForValue().set(TOKEN_PREFIX + uuid.toString(), objectMapper.writeValueAsString(token))
        return uuid
    }
}