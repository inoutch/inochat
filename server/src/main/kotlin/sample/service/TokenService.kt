package sample.service

import org.springframework.stereotype.Service
import sample.entity.User
import sample.extention.orNull
import sample.repository.TokenRepository
import sample.repository.UserRepository
import java.util.*

@Service
class TokenService(
        private val tokenRepository: TokenRepository,
        private val userRepository: UserRepository) {
    fun createToken(userId: Int): UUID {
        val user = userRepository.findById(userId).orNull() ?: throw RuntimeException("user not found")
        return tokenRepository.createToken(user.id)
    }

    fun authorize(token: UUID): User {
        val userId = tokenRepository.getUserId(token) ?: throw RuntimeException("user id not found")
        val user = userRepository.findById(userId).orNull() ?: throw RuntimeException("user is not found")
        if (!user.enable) {
            throw RuntimeException("user is disabled")
        }
        return user
    }
}