from __future__ import annotations

from time import sleep


def main() -> None:
    print("Wisdom AgentDB worker started")
    while True:
        sleep(60)


if __name__ == "__main__":
    main()
