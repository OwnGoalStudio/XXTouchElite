# XXTouch Elite

> Full-Fledged Automation Framework for Jailbroken iOS

XXTouch Elite is the successor to XXTouch, which was originally hosted on BigBoss since 2015.

It is now available on Havoc Repo and supports iOS 14+ with modern jailbreaks and [TrollStore](https://ios.cfw.guide/installing-trollstore/).

[now-on-havoc]: https://havoc.app/search/XXTouch

[<img width="150" src="https://docs.havoc.app/img/badges/get_square.svg" alt="Havoc Repo" />][now-on-havoc]

## Compatibility

“XXTouch Elite” is compatible with:

- Any iPhone, or iPad from iOS 14 to 16
- [unc0ver](https://unc0ver.dev)/[Taurine](https://taurine.app) (up to iOS 14.8.1)
- [palera1n](https://palera.in) (up to iOS 16.x)
- [Dopamine](https://ellekit.space/dopamine/) with “Hide Jailbreak” **disabled**
- [Dopamine (RootHide)](https://github.com/roothide/Dopamine2-roothide/) @ My Repo: **apt.82flex.com**

⚠️ Serotonin/NathanLR is **NOT** supported by “XXTouch Elite”, you have to install and use “XXTouch Elite TS” instead. ⚠️

“XXTouch Elite TS” is compatible with:

- Any iPhone, or iPad from iOS 14 to 17.0
- [TrollStore](https://ios.cfw.guide/installing-trollstore/) 2.x

Use at your own risk if your device or jailbreak environment is not listed above.
No refund will be given if you don’t read it carefully.

## 🚀 Core Features

**High-Precision Touch Automation Engine**:

- Supports **recording and playback** of taps, swipes, and long presses at **full resolutions** with **<0.01s timing accuracy**.
- **Multi-Touch Simulation**: Supports simultaneous emulation of up to 10 touch points for complex gesture automation (e.g., pinch-to-zoom, gaming combos).
- Emulates **3D Touch pressure sensitivity** with customizable levels for scenario-specific interactions.

**Advanced Image Recognition**:

- **20ms Ultra-Fast Screenshot Capture**: Achieves screen grabbing in <20ms with direct frame-buffer access.
- **OpenCV-Powered Detection**: Enables pixel-perfect `find_image()`/`find_colors()` operations with multi-threshold pattern matching.
- **Hybrid OCR Engine**: Combines Tesseract’s multi-language support with iOS Vision framework’s real-time text detection (<100ms processing @1080P).

**Deep System Integration**:

- Direct access to **SpringBoard UI elements** for dynamic control capture and automation.
- Read/write access to app sandbox file systems, including database operations and config management.
- Programmatic control of **Lock Screen/Wake State** transitions without any dependencies.
- Dynamic **Wi-Fi/VPN Configuration** through MobileWiFi and SystemConfiguration framework integration.
- Granular control over **Display Brightness**, **Auto-Lock Timer**, and **Low Power Mode** thresholds.

**Developer-Optimized Toolchain**:

- Full featured **Lua 5.3** scripting language support.
- Built-in debug console featuring breakpoints, variable inspection, and error stack tracing.
- Script obfuscation compiler for intellectual property protection.
- Integrated with **Objective-C FFI bridge** to control over the entire iOS.

**Simple File Management**:

- Browse local files with subdirectories.
- Clipboard, rename, create symbolic links.
- Edit file permissions.
- Import documents via WebDAV.
- ZIP compression and decompression.

**Native Lua Editor**:

- Lua language syntax highlighting.
- Display line number and control character.
- Full screen editing, immersive experience.
- Auto indentation, wrapped line indentation and auto word wrap.
- Auxiliary keypad with automatic brackets.
- Support for regular expression search and replacement.

## 🔧 Technical Advantages

- **Low-Level System Access**: Leverages jailbreak capabilities to invoke private iOS APIs for native-level control.
- **Resource Efficiency**: Dynamic frequency scaling reduces CPU usage by 30% compared to alternatives.
- **Cross-Version Compatibility**: Supports iOS 14 through iOS 16 on mainstream jailbroken devices.
- **Modular Extensibility**: Plugin architecture allows seamless integration of third-party modules.

## 🌍 Use Cases

- **App Testing**: Automated UI traversal, stress testing, and performance monitoring.
- **Workflow Automation**: Batch file processing, custom macro creation, and system optimization.
- **Smart Control**: Environment-responsive scripts using sensor data (e.g., auto-adjusting screen brightness).
- **UI Customization**: Dynamic modification of SpringBoard layouts and interaction logic.

## 📦 Deployment & Support

- **Documentation**: Comprehensive API manual with 200+ practical script examples.
- **Community**: Active developer forum and Telegram group for real-time support.

*XXTouch Elite is an OwnGoal Studio product authorized by **@havonz**, the original author of XXTouch.*
