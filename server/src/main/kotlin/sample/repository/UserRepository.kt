package sample.repository

import org.springframework.data.jpa.repository.JpaRepository
import sample.entity.User

interface UserRepository : JpaRepository<User, Int> {
    fun findByUsername(username: String): User?
}