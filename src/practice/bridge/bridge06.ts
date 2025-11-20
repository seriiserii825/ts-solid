// ===============================
// 6) Видео-плеер
// -------------------------------
// Абстракция: Video
// Реализация: LocalSource, HttpStreamingSource, TorrentSource
// ЗАДАЧА: Любой Video класс (Movie, Clip, Trailer) должен проигрываться из любого Source.

interface Source {
    play(): void;
}

class LocalSource implements Source {
    play(): void {
        console.log("Playing video from local source.");
    }
}
class HttpStreamingSource implements Source {
    play(): void {
        console.log("Playing video from HTTP streaming source.");
    }
}
class TorrentSource implements Source {
    play(): void {
        console.log("Playing video from torrent source.");
    }
}

abstract class Video {
    protected source: Source;

    constructor(source: Source) {
        this.source = source;
    }

    abstract play(): void;
}

class Movie extends Video {
    play(): void {
        console.log("Movie is starting...");
        this.source.play();
    }
}
class Clip extends Video {
    play(): void {
        console.log("Clip is starting...");
        this.source.play();
    }
}
class Trailer extends Video {
    play(): void {
        console.log("Trailer is starting...");
        this.source.play();
    }
}

const localSource = new LocalSource();
const httpSource = new HttpStreamingSource();
const torrentSource = new TorrentSource();
const movie = new Movie(localSource);
const clip = new Clip(httpSource);
const trailer = new Trailer(torrentSource);
movie.play();      // Movie is starting... Playing video from local source.
clip.play();       // Clip is starting... Playing video from HTTP streaming source.
trailer.play();   // Trailer is starting... Playing video from torrent source.
