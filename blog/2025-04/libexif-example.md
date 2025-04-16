---
authors: lessica
tags: [exif, libexif, luaexif, jpeg, lua, yaml]
---

# luaexif Example

We have **modified** and pre-compiled the [libexif](https://github.com/libexif/libexif) and [luaexif](https://github.com/minoki/luaexif) libraries, which can be used to read or write EXIF metadata of JPEG images.

<!-- truncate -->

The EXIF metadata in YAML format read from a photo taken by an iPhone is as follows:

```yaml title="luaexif-example.yaml"
---
0:
  DateTime: 2023:02:03 21:55:09
  Make: Apple
  Model: iPhone SE (2nd generation)
  Orientation: 6
  ResolutionUnit: 2
  Software: '14.8'
  XResolution:
  - 72
  - 1
  YCbCrPositioning: 1
  YResolution:
  - 72
  - 1
1:
  Compression: 6
  ResolutionUnit: 2
  XResolution:
  - 72
  - 1
  YResolution:
  - 72
  - 1
EXIF:
  ApertureValue:
  - 54823
  - 32325
  BrightnessValue:
  - 22033
  - 12445
  ColorSpace: 65535
  ComponentsConfiguration: "\x01\x02\x03\0"
  CompositeImage: 2
  DateTimeDigitized: 2023:02:03 21:55:09
  DateTimeOriginal: 2023:02:03 21:55:09
  ExifVersion: '0232'
  ExposureBiasValue:
  - 0
  - 1
  ExposureMode: 0
  ExposureProgram: 2
  ExposureTime:
  - 1
  - 59
  Flash: 24
  FlashpixVersion: '0100'
  FNumber:
  - 9
  - 5
  FocalLength:
  - 399
  - 100
  FocalLengthIn35mmFilm: 28
  ISOSpeedRatings: 250
  LensMake: Apple
  LensModel: iPhone SE (2nd generation) back camera 3.99mm f/1.8
  LensSpecification:
  - - 399
    - 100
  - - 399
    - 100
  - - 9
    - 5
  - - 9
    - 5
  MakerNote: '{length = 1244, bytes = 0x4170706c 6520694f 53000001 4d4d0020 ... 41424138
    36410000 }'
  MeteringMode: 5
  OffsetTime: +08:00
  OffsetTimeDigitized: +08:00
  OffsetTimeOriginal: +08:00
  PixelXDimension: 4032
  PixelYDimension: 3024
  SceneCaptureType: 0
  SceneType: "\x01"
  SensingMethod: 2
  ShutterSpeedValue:
  - 41912
  - 7129
  SubjectArea:
  - 2013
  - 1511
  - 2217
  - 1330
  SubSecTimeDigitized: '439'
  SubSecTimeOriginal: '439'
  WhiteBalance: 0
GPS:
  GPSAltitude:
  - 87103
  - 6210
  GPSAltitudeRef: 0
  GPSDateStamp: 2023:02:03
  GPSDestBearing:
  - 550625
  - 3374
  GPSDestBearingRef: T
  GPSHPositioningError:
  - 65
  - 1
  GPSImgDirection:
  - 550625
  - 3374
  GPSImgDirectionRef: T
  GPSLatitude:
  - - 32
    - 1
  - - 1
    - 1
  - - 3551
    - 100
  GPSLatitudeRef: 'N'
  GPSLongitude:
  - - 118
    - 1
  - - 53
    - 1
  - - 4916
    - 100
  GPSLongitudeRef: E
  GPSSpeed:
  - 0
  - 1
  GPSSpeedRef: K
...
```

Due to the complex structure of EXIF metadata and lack of standardization, we will not provide a detailed introduction here. You can refer to [EXIF Tags](https://exiftool.org/TagNames/EXIF.html) and the **example below** to modify it.

```lua title="luaexif-example.lua" showLineNumbers
-- Import module
exif = require 'image.exif'

-- Read EXIF metadata from a JPEG image
exif_data = exif.loadfile('IMG_0001.jpeg')

-- Convert EXIF metadata to a modifiable Lua table (this table can be further converted to plist/json/yaml and saved for reuse)
exif_table = exif_data:as_table()

-- Modify some fields in the table
exif_table['0'].Model = 'iPhone 11 Pro'
exif_table['0'].Software = '16.2'

-- Reconstruct EXIF metadata
new_exif_data = exif.from_table(exif_table)

-- Write EXIF metadata to a JPEG file (can write back to the original file or create a new file)
ok, err = new_exif_data:save('IMG_0002.jpeg')
```
