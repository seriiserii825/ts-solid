// =========================
// Задача 9 — Видео-плеер
// -------------------------
// Новый интерфейс видеоплеера:
interface VideoPlayer {
  play(url: string): void;
}

// Старый HTML5 плеер:
class Html5Player {
  playFile(fileUrl: string) {
    console.log(`Playing video from ${fileUrl} using HTML5 Player.`);
  }
}
interface IHtml5Player {
  playFile(fileUrl: string): void;
}

// Сторонняя библиотека:
class ThirdPartyPlayer {
  startStreaming(streamUrl: string) {
    console.log(`Streaming video from ${streamUrl} using Third Party Player.`);
  }
}

// ❗ ЗАДАЧА:
// Сделать два адаптера:
// - Html5Player → VideoPlayer
// - ThirdPartyPlayer → VideoPlayer
// и показать, как клиентский код работает только через VideoPlayer.

class Html5PlayerAdapter implements VideoPlayer {
  private html5Player: IHtml5Player;

  constructor(html5Player: IHtml5Player) {
    this.html5Player = html5Player;
  }

  play(url: string): void {
    this.html5Player.playFile(url);
  }
}

class ThirdPartyPlayerAdapter implements VideoPlayer {
  private thirdPartyPlayer: ThirdPartyPlayer;

  constructor(thirdPartyPlayer: ThirdPartyPlayer) {
    this.thirdPartyPlayer = thirdPartyPlayer;
  }

  play(url: string): void {
    this.thirdPartyPlayer.startStreaming(url);
  }
}

const html5Player: IHtml5Player = new Html5Player();
const html5Adapter: VideoPlayer = new Html5PlayerAdapter(html5Player);
html5Adapter.play("http://example.com/video.mp4");
const thirdPartyPlayer: ThirdPartyPlayer = new ThirdPartyPlayer();
const thirdPartyAdapter: VideoPlayer = new ThirdPartyPlayerAdapter(thirdPartyPlayer);
thirdPartyAdapter.play("http://example.com/stream");
