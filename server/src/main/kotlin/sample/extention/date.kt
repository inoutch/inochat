package sample.extention

import java.util.*

fun Date.plusDays(days: Int): Date {
    val calendar = GregorianCalendar()
    calendar.time = this
    calendar.add(Calendar.DATE, days)
    return calendar.time
}

fun Date.plusHours(hours: Int): Date {
    val calendar = GregorianCalendar()
    calendar.time = this
    calendar.add(Calendar.HOUR, hours)
    return calendar.time
}
