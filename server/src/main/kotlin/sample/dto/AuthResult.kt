package sample.dto

import java.util.*

data class AuthResult(val token: UUID, val userId: Int, val username: String)