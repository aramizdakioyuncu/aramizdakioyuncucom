import 'dart:async';
import 'dart:developer';
import 'dart:typed_data';
import 'package:audioplayers/audioplayers.dart';
import 'package:record/record.dart';

class AudioRecorderService {
  final record = AudioRecorder();
  final AudioPlayer audioPlayer = AudioPlayer();
  bool isRecording = false;

  InputDevice? selectedMic;

  Future<List<InputDevice>> listMicrophones() async {
    final record = AudioRecorder();
    final devices = await record.listInputDevices();

    for (var device in devices) {
      log("🎤 Mikrofon: ${device.label} (ID: ${device.id})");
    }

    return devices;
  }

  dispose() {
    audioPlayer.stop();
    audioPlayer.dispose();

    record.stop();
    record.dispose();
  }

  // Seçilen mikrofonu ayarlama
  void setMicrophone(InputDevice mic) {
    selectedMic = mic;
    log("🎤 Seçilen mikrofon: ${mic.label}");
  }

  Future<void> startRecording() async {
    if (!(await record.hasPermission())) {
      log("🚫 Mikrofon izni yok!");
      return;
    }

    if (selectedMic == null) {
      log("🚫 Mikrofon seçilmedi!");
      return;
    }

    isRecording = true;

    log("🎤 Ses kaydı başladı...");

    // ---------------------------------------------------------

    // // DOSYA KAYIT
    // record.start(
    //   RecordConfig(
    //     encoder: AudioEncoder.wav,
    //     device: selectedMic,
    //   ),
    //   path: "rec/rec.wav",
    // );

    // // 5 saniye kaydettikten sonra durdur
    // await Future.delayed(const Duration(seconds: 5));

    // // Kaydı durdur
    // await record.stop();

    // // Dosya varsa oynat
    // final wavFile = File("rec/rec.wav");

    // if (await wavFile.exists()) {
    //   // Dosyayı oynat

    //   try {
    //     await audioPlayer.play(DeviceFileSource(wavFile.path));
    //     print("Ses oynatılıyor...");
    //     // Ses dosyası çalındıktan sonra sil
    //     // await wavFile.delete();
    //   } catch (e) {
    //     log(e.toString());
    //   }
    // } else {
    //   print("Dosya bulunamadı.");
    // }

    // ---------------------------------------------------------

    final stream = await record.startStream(
      RecordConfig(
        encoder: AudioEncoder.pcm16bits,
        device: selectedMic,
      ),
    );

    stream.listen(
      (event) {
        log("🔊 Ses çalınıyor...");

        try {
          //Çalışıyor Ama Ses Boğuk Geliyor
          // audioPlayer.play(BytesSource(convertPcmToWav(event)));
        } catch (e) {
          log("Hata oluştu: $e");
        }
      },
      onError: (error) {
        log("Stream hatası: $error");
      },
      onDone: () {
        log("Ses çalma tamamlandı.");
      },
    );

    // await Future.delayed(const Duration(seconds: 5));
    // await record.stop();

    // ---------------------------------------------------------

    // // Kaydı gönder
    // await stopAndSendRecording(signalRService, audioData);
  }

  // Future<void> stopAndSendRecording(
  //     SignalRService? signalRService, Uint8List audioData) async {
  //   // String base64Audio = base64Encode(audioData);

  //   if (signalRService != null) {
  //     signalRService.sendAudio(audioData);
  //     log("📤 Ses SignalR'a gönderildi!");
  //   }
  //   //Sesi Dinle
  //   AudioPlayerService().playBase64Audio(audioData);
  // }

  Uint8List convertPcmToWav(Uint8List pcmData) {
    int sampleRate = 44100; // Örnekleme hızı
    int numChannels = 1; // Kanal sayısı (mono)
    int bitsPerSample = 16; // Her örnek için bit sayısı (16-bit)

    // WAV dosyasının başlık bilgisi
    int byteRate =
        sampleRate * numChannels * (bitsPerSample ~/ 8); // Byte rate hesaplama
    int blockAlign =
        numChannels * (bitsPerSample ~/ 8); // Block align hesaplama

    // WAV başlığı oluşturuluyor
    List<int> wavHeader = [
      0x52, 0x49, 0x46, 0x46, // "RIFF" başlığı
      ..._intToBytes(36 + pcmData.length, 4), // Dosya boyutu
      0x57, 0x41, 0x56, 0x45, // "WAVE" başlığı
      0x66, 0x6D, 0x74, 0x20, // "fmt " başlığı
      0x10, 0x00, 0x00, 0x00, // Subchunk1Size (16)
      0x01, 0x00, // AudioFormat (PCM)
      ..._intToBytes(numChannels, 2), // Kanal sayısı
      ..._intToBytes(sampleRate, 4), // Örnekleme hızı
      ..._intToBytes(byteRate, 4), // Byte rate
      ..._intToBytes(blockAlign, 2), // Block align
      ..._intToBytes(bitsPerSample, 2), // Bits per sample (16-bit)
      0x64, 0x61, 0x74, 0x61, // "data" başlığı
      ..._intToBytes(pcmData.length, 4), // Data chunk boyutu
    ];

    // WAV dosyasının başlığını PCM verisiyle birleştir
    return Uint8List.fromList([...wavHeader, ...pcmData]);
  }

  List<int> _intToBytes(int value, int byteCount) {
    return List.generate(byteCount, (index) => (value >> (index * 8)) & 0xFF);
  }
}
