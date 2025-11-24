// 1) Facade для модуля "Видео-плеер"
// Подсистемы: VideoDecoder, AudioDecoder, Subtitles, NetworkLoader
// Задача: создать VideoPlayerFacade.play(url), который запускает все шаги.
// ---------------------------------------------

class VideoDecoder {
    decode(videoData: string): string {
        console.log("Decoding video data...");
        return `decoded video from ${videoData}`;
    }
}
class AudioDecoder {
    decode(audioData: string): string {
        console.log("Decoding audio data...");
        return `decoded audio from ${audioData}`;
    }
}
class Subtitles {
    load(subtitleData: string): string {
        console.log("Loading subtitles...");
        return `loaded subtitles from ${subtitleData}`;
    }
}
class NetworkLoader {
    load(url: string): { videoData: string; audioData: string; subtitleData: string } {
        console.log(`Loading media from ${url}...`);
        return {
            videoData: `video data from ${url}`,
            audioData: `audio data from ${url}`,
            subtitleData: `subtitle data from ${url}`,
        };
    }
}
class VideoPlayerFacade {
  constructor(
    private videoDecoder: VideoDecoder,
    private audioDecoder: AudioDecoder,
    private subtitles: Subtitles,
    private networkLoader: NetworkLoader
  ) {}
  play(url: string): void {
    const { videoData, audioData, subtitleData } = this.networkLoader.load(url);
    const decodedVideo = this.videoDecoder.decode(videoData);
    const decodedAudio = this.audioDecoder.decode(audioData);
    const loadedSubtitles = this.subtitles.load(subtitleData);

    console.log("Playing video:");
    console.log(decodedVideo);
    console.log(decodedAudio);
    console.log(loadedSubtitles);
  }
}

const videoPlayer = new VideoPlayerFacade(
  new VideoDecoder(),
  new AudioDecoder(),
  new Subtitles(),
  new NetworkLoader()
);
videoPlayer.play("http://example.com/video");
