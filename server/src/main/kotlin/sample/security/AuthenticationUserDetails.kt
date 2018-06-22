package sample.security

import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.User

class AuthenticationUserDetails(user: sample.entity.User) : User(
        user.username,
        user.passwordHash,
        AuthorityUtils.createAuthorityList("ROLE_NONE")) {
    val userId = user.id
}