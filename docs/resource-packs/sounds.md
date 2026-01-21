# Sounds & Music

Add custom audio to your resource pack.

## Audio Formats

### Recommended: OGG Vorbis

- Good compression
- Excellent quality
- Widely supported

### Conversion

Convert audio files using:

- **Audacity** (free)
- **FFmpeg** (command line)

```bash
# Convert WAV to OGG
ffmpeg -i input.wav -c:a libvorbis -q:a 5 output.ogg

# Convert MP3 to OGG
ffmpeg -i input.mp3 -c:a libvorbis -q:a 5 output.ogg
```

## Sound Categories

Organize sounds by type:

```
sounds/
├── music/           # 2-4 minute tracks
├── ambient/         # Environmental loops
├── effects/         # Short sound effects
├── ui/              # Interface sounds
└── creatures/       # Entity sounds
```

## Sound Definitions

Define sounds in `sounds.json`:

```json
{
  "sounds": {
    "custom.explosion": {
      "files": ["effects/explosion.ogg"],
      "volume": 1.0,
      "pitch": 1.0
    },
    "custom.music.combat": {
      "files": ["music/combat.ogg"],
      "volume": 0.5,
      "loop": true,
      "category": "music"
    }
  }
}
```

## Sound Properties

| Property | Type | Description |
|----------|------|-------------|
| `files` | string[] | List of audio files |
| `volume` | float | 0.0 to 1.0 |
| `pitch` | float | 0.5 to 2.0 |
| `loop` | boolean | Repeat continuously |
| `category` | string | music, effect, ambient |

## Random Variations

Add variety with multiple files:

```json
{
  "sounds": {
    "footstep.grass": {
      "files": [
        "effects/footstep_grass_1.ogg",
        "effects/footstep_grass_2.ogg",
        "effects/footstep_grass_3.ogg"
      ],
      "volume": 0.8
    }
  }
}
```

The game picks randomly from the list.

## Audio Tips

### Volume Levels

- **Music**: 0.3 - 0.5 (background)
- **Ambient**: 0.5 - 0.7
- **Effects**: 0.7 - 1.0
- **UI**: 0.8 - 1.0

### File Optimization

- Use mono for effects (smaller files)
- Use stereo for music
- Sample rate: 44100 Hz
- Quality: 5-7 for OGG (-q:a flag)
