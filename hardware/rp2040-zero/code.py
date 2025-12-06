"""Простейший пример для RP2040-Zero на CircuitPython.
Мигает встроенным светодиодом и выводит сообщения в консоль.
"""

import time

import board
import digitalio

led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

# Интервал мигания светодиода (секунды)
BLINK_INTERVAL = 0.25
# Как часто выводить служебное сообщение в консоль (секунды)
STATUS_INTERVAL = 5

print("CircuitPython запущен на RP2040-Zero. Нажмите Ctrl+C в REPL для остановки.")

_elapsed = 0.0
while True:
    led.value = True
    time.sleep(BLINK_INTERVAL)
    led.value = False
    time.sleep(BLINK_INTERVAL)

    _elapsed += BLINK_INTERVAL * 2
    if _elapsed >= STATUS_INTERVAL:
        print("LED мигает, устройство работает корректно.")
        _elapsed = 0.0
