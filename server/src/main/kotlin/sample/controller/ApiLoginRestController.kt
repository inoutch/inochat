package sample.controller

import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import sample.dto.AuthResult
import sample.security.AuthenticationUserDetails
import sample.service.TokenService

@RequestMapping("api")
@RestController
class ApiLoginRestController(private val tokenService: TokenService) {
    @GetMapping("login")
    fun login(@AuthenticationPrincipal authenticationUserDetails: AuthenticationUserDetails): AuthResult {
        val token = tokenService.createToken(authenticationUserDetails.userId)
        val user = tokenService.authorize(token)
        return AuthResult(token, user.id, user.username)
    }
}