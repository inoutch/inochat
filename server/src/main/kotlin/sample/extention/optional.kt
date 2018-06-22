package sample.extention

import java.util.*

fun <T> Optional<T>.orNull(): T? = orElse(null)