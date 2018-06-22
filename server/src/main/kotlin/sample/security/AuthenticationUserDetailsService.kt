package sample.security

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import sample.repository.UserRepository

@Service
class AuthenticationUserDetailsService(
        private val userRepository: UserRepository) : UserDetailsService {
    override fun loadUserByUsername(username: String?): UserDetails {
        if (username == null) {
            throw UsernameNotFoundException("username is null")
        }
        val user = userRepository.findByUsername(username)
        if (user == null || !user.enable) {
            throw UsernameNotFoundException("user is null or disabled")
        }
        return AuthenticationUserDetails(user)
    }
}
