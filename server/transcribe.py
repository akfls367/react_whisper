import whisper
import sys
import json

def transcribe(audio_path):
    model = whisper.load_model("base")  # 모델 크기: base, small, medium, large
    result = model.transcribe(audio_path)
    return result["text"]

if __name__ == "__main__":
    audio_path = sys.argv[1]
    try:
        transcription = transcribe(audio_path)
        print(json.dumps({"transcription": transcription}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
