---
authors: lessica
tags: [exif, libexif, luaexif, jpeg, lua, yaml]
---

# luaexif 例程

我们**修改**并预编译了 [libexif](https://github.com/libexif/libexif) 和 [luaexif](https://github.com/minoki/luaexif) 库，可以用来读取或写入 JPEG 图片的 EXIF 元数据。

<!-- truncate -->

从 iPhone 拍摄的一张照片中读取出的 EXIF 元数据 YAML 格式如下：

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

由于 EXIF 元数据的结构复杂，且没有标准化，所以在此不作详细介绍。你可以参考 [EXIF Tags](https://exiftool.org/TagNames/EXIF.html) 和**下述例程**对其进行修改。

```lua title="luaexif-example.lua" showLineNumbers
-- 引入模块
exif = require 'image.exif'

-- 读取 JPEG 图片的 EXIF 元数据
exif_data = exif.loadfile('IMG_0001.jpeg')

-- 将 EXIF 元数据转换为可修改的 Lua 表（此表可以进一步转换为 plist/json/yaml 并保存，以供重复使用）
exif_table = exif_data:as_table()

-- 修改表中的一些字段
exif_table['0'].Model = 'iPhone 11 Pro'
exif_table['0'].Software = '16.2'

-- 重新构造 EXIF 元数据
new_exif_data = exif.from_table(exif_table)

-- 写入 EXIF 元数据到 JPEG 文件（可写回原来文件，也可写入新文件）
ok, err = new_exif_data:save('IMG_0002.jpeg')
```
