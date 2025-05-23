---
sidebar_position: 21
---

# URL 与二维码协议

该协议规定了 “X.X.T.E.” 应用程序的 URL Scheme 所支持的动作及参数：

- 打开 `xxt://` 形式的 URL
- 扫描包含 `xxt://` 形式 URL 的二维码
- 扫描包含动作及参数字典的二维码

以上三种方式将会唤醒 “X.X.T.E.”，做出相应行为。

## 打开扫一扫

![qr-scan](./img/qr-scan.png)

```txt
xxt://scan/
```

```json
{
    "event": "scan"
}
```

## 运行脚本

![qr-launch](./img/qr-launch.png)

```txt
xxt://launch/
xxt://launch/?path=%@
```

`path` 为欲运行的脚本绝对路径，若不指定 `path` 参数, 则运行当前选中脚本。

```json
{
    "event": "launch",
    "path": "Absolute path of the script to run"
}
```

## 停止脚本

![qr-stop](./img/qr-stop.png)

```txt
xxt://stop/
```

```json
{
    "event": "stop"
}
```

## 下载相关

![qr-download](./img/qr-download.png)

```txt
xxt://download/?path=%@&url=%@
```

从指定 URL 下载文件。`path` 为欲保存的文件名，`url` 为指定的 URL。

:::note
如果不指定 `path`，文件名将自动从目标 URL 猜测，或选取 URL 的最后一部分作为文件名。  
`path` 可指定为绝对路径或相对路径，若指定为相对路径，则其路径是相对于 App 文件浏览器当前所在的目录而言的。
:::

## 恢复工作区

![qr-workspace](./img/qr-workspace.png)

```txt
xxt://workspace/
```

将 “X.X.T.E.” 恢复到刚启动应用时的状态，退出所有打开的界面。

```json
{
    "event":"workspace"
}
```

## 设置 URL 协议

- Apple ID → (root): `prefs:root=APPLE_ACCOUNT`
- Apple ID → Name, Phone Numbers, Email: `prefs:root=APPLE_ACCOUNT&path=APPLE_ACCOUNT_CONTACT`
- Apple ID → Password & Security: `prefs:root=APPLE_ACCOUNT&path=PASSWORD_AND_SECURITY`
- Apple ID → Payment & Shipping: `prefs:root=APPLE_ACCOUNT&path=PAYMENT_AND_SHIPPING`
- Apple ID → Subscriptions: `prefs:root=APPLE_ACCOUNT&path=SUBSCRIPTIONS`
- iCloud → (root): `prefs:root=CASTLE` or `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE`
- iCloud → Keychain: `prefs:root=CASTLE&path=com.apple.Dataclass.KeychainSync` or `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.KeychainSync`
- iCloud → iCloud Backup: `prefs:root=CASTLE&path=BACKUP` or `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/BACKUP`
- iCloud → iCloud Mail → (root): `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail`
- iCloud → iCloud Mail → Default Email: `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/DEFAULT_EMAIL`
- iCloud → iCloud Mail → Addresses: `refs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/ALIASES`
- iCloud → iCloud Mail → Auto-Reply: `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/AUTO_REPLY`
- iCloud → iCloud Mail → iCloud Mail Rules: `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/SERVER_SIDE_RULES`
- iCloud → iCloud Mail → Mail Forwarding: `refs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/MAIL_FORWARDING`
- iCloud → iCloud Mail → Mailbox Behaviors: `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/MAILBOX_BEHAVIORS`
- iCloud → iCloud Mail → Signing and Encryption: `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/S_MIME`
- iCloud → iCloud Mail → Import Messages: `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/com.apple.Dataclass.Mail/MAIL_IMPORT`
- iCloud → Find My: `prefs:root=APPLE_ACCOUNT&path=LOCATION_SHARING`
- iCloud → Family Sharing: `prefs:root=APPLE_ACCOUNT&path=FAMILY`
- iCloud → Hide My Email: `prefs:root=APPLE_ACCOUNT&path=ICLOUD_SERVICE/PRIVATE_EMAIL_MANAGE`
- Wi-Fi: `prefs:root=WIFI`
- Bluetooth: `prefs:root=Bluetooth`
- Cellular → (root): `prefs:root=MOBILE_DATA_SETTINGS_ID`
- Cellular → Cellular Data Options: `prefs:root=MOBILE_DATA_SETTINGS_ID&path=CELLULAR_DATA_OPTIONS`
- Cellular → Cellular Data (for devices with two SIMs): `prefs:root=MOBILE_DATA_SETTINGS_ID&path=MOBILE_DATA_SETTINGS`
- Cellular → Personal Hotspot → (root): `prefs:root=MOBILE_DATA_SETTINGS_ID&path=INTERNET_TETHERING`
- Cellular → Personal Hotspot → Wi-Fi Password: `prefs:root=MOBILE_DATA_SETTINGS_ID&path=INTERNET_TETHERING/Wi-Fi%20Password`
- Cellular → Personal Hotspot → Family Sharing → (root): `prefs:root=MOBILE_DATA_SETTINGS_ID&path=INTERNET_TETHERING/Family%20Sharing`
- Cellular → Personal Hotspot → Family Sharing → [Family Member Name]: `prefs:root=MOBILE_DATA_SETTINGS_ID&path=INTERNET_TETHERING/Family%20Sharing/[URL-encoded Family Member Name]`
- Cellular → System Services: `prefs:root=MOBILE_DATA_SETTINGS_ID&path=System%20Services`
- Cellular → [plan name]: `prefs:root=MOBILE_DATA_SETTINGS_ID&path=[plan name]`
- Cellular → Reset Statistics: `prefs:root=MOBILE_DATA_SETTINGS_ID#Reset%20Statistics`
- Personal Hotspot → (root): `prefs:root=INTERNET_TETHERING`
- Personal Hotspot → Wi-Fi Password: `prefs:root=INTERNET_TETHERING&path=Wi-Fi%20Password`
- Personal Hotspot → Family Sharing → (root): `prefs:root=INTERNET_TETHERING&path=Family%20Sharing`
- Personal Hotspot → Family Sharing → [Family Member Name]: `prefs:root=INTERNET_TETHERING&path=Family%20Sharing/[URL-encoded Family Member Name]`
- VPN → (root): `prefs:root=VPN`
- VPN → [VPN configuration] → (root): `prefs:root=VPN&path=[URL-encoded VPN Configuration Name]`
- VPN → [VPN configuration] → Delete VPN: `prefs:root=VPN&path=[URL-encoded VPN Configuration Name]/Delete%20VPN`
- VPN → Add VPN Configuration…: `prefs:root=VPN&path=Add%20VPN%20Configuration%E2%80%A6`
- Notifications → (root): `prefs:root=NOTIFICATIONS_ID`
- Notifications → App Name: `prefs:root=NOTIFICATIONS_ID&path=App%20Bundle%20ID`
- Notifications → Show Previews: `prefs:root=NOTIFICATIONS_ID&path=SHOW_PREVIEW_GROUP_ID` (credit to: [u/AnthoPak](https://www.reddit.com/r/shortcuts/comments/xsx8j7/does_anyone_know_url_scheme_for_ios_notification/iqoy4lm/))
- Notifications → Siri Suggestions: `prefs:root=NOTIFICATIONS_ID&path=Siri%20Suggestions`
- Sounds → (root): `prefs:root=Sounds`
- Sounds → Haptics: `prefs:root=Sounds&path=HAPTICS`
- Sounds → Ringtone: `prefs:root=Sounds&path=Ringtone`
- Sounds → Text Tone: `prefs:root=Sounds&path=Text_Messages`
- Sounds → New Voicemail: `prefs:root=Sounds&path=Voicemail`
- Sounds → New Mail: `prefs:root=Sounds&path=NEW_MAIL`
- Sounds → Sent Mail: `prefs:root=Sounds&path=SENT_MAIL`
- Sounds → Calendar Alerts: `prefs:root=Sounds&path=Calendar%20Alarm`
- Sounds → Reminder Alerts: `prefs:root=Sounds&path=Reminder%20Alerts`
- Sounds → AirDrop: `prefs:root=Sounds&path=AIRDROP`
- Screen Time → (root): `prefs:root=SCREEN_TIME`
- Screen Time → Turn On Screen Time: `prefs:root=SCREEN_TIME&path=Turn%20On%20Screen%20Time`
- Screen Time → See All Activity: `prefs:root=SCREEN_TIME&path=SCREEN_TIME_SUMMARY`
- Screen Time → Downtime: `prefs:root=SCREEN_TIME&path=DOWNTIME`
- Screen Time → App Limits: `prefs:root=SCREEN_TIME&path=APP_LIMITS`
- Screen Time → Always Allowed: `prefs:root=SCREEN_TIME&path=ALWAYS_ALLOWED`
- Screen Time → Screen Distance: `prefs:root=SCREEN_TIME&path=EYE_DISTANCE`
- Screen Time → Communication Limits: `prefs:root=SCREEN_TIME&path=COMMUNICATION_LIMITS`
- Screen Time → Content & Privacy Restrictions: `prefs:root=SCREEN_TIME&path=CONTENT_PRIVACY`
- General → (root): `prefs:root=General`
- General → About → (root): `prefs:root=General&path=About`
- General → About → SEID: `prefs:root=General&path=About/SEID`
- General → About → Certificate Trust Settings: `prefs:root=General&path=About/CERT_TRUST_SETTINGS`
- General → Software Update: `prefs:root=General&path=SOFTWARE_UPDATE_LINK`
- General → AirDrop: `prefs:root=General&path=AIRDROP_LINK`
- General → AirPlay & Handoff: `prefs:root=General&path=CONTINUITY_SPEC`
- General → CarPlay: `prefs:root=General&path=CARPLAY`
- General → iPhone/iPad Storage → (root): `prefs:root=General&path=STORAGE_MGMT`
- General → iPhone/iPad Storage → [App Name]: `prefs:root=General&path=STORAGE_MGMT/[App Bundle ID]`
- General → Background App Refresh → (root): `prefs:root=General&path=AUTO_CONTENT_DOWNLOAD`
- General → Background App Refresh → Background App Refresh: `prefs:root=General&path=AUTO_CONTENT_DOWNLOAD/AUTO_CONTENT_DOWNLOAD`
- General → Date & Time: `prefs:root=General&path=DATE_AND_TIME`
- General → Keyboard → (root): `prefs:root=General&path=Keyboard`
- General → Keyboard → Keyboards: `prefs:root=General&path=Keyboard/KEYBOARDS`
- General → Keyboard → Hardware Keyboard: `prefs:root=General&path=Keyboard/Hardware%20Keyboard`
- General → Keyboard → Text Replacement: `prefs:root=General&path=Keyboard/USER_DICTIONARY`
- General → Keyboard → One Handed Keyboard: `prefs:root=General&path=Keyboard/ReachableKeyboard`
- General → Language & Region → (root): `prefs:root=General&path=INTERNATIONAL`
- General → Language & Region → Device Language: `prefs:root=General&path=INTERNATIONAL/DEVICE_LANGUAGE`
- General → Language & Region → Region: `prefs:root=General&path=INTERNATIONAL/LOCALE`
- General → Language & Region → Calendar: `prefs:root=General&path=INTERNATIONAL/CALENDAR`
- General → Language & Region → Numbers: `prefs:root=General&path=INTERNATIONAL/NUMBERING_SYSTEM`
- General → Language & Region → Temperature Unit: `prefs:root=General&path=INTERNATIONAL/TEMPERATURE_UNIT`
- General → Dictionary: `prefs:root=General&path=DICTIONARY`
- General → VPN → (root): `prefs:root=General&path=VPN`
- General → VPN → [VPN Configuration Name] → (root): `prefs:root=General&path=VPN/[URL-encoded VPN Configuration Name]`
- General → VPN → [VPN Configuration Name] → Delete VPN: `prefs:root=General&path=VPN/[URL-encoded VPN Configuration Name]/Delete%20VPN`
- General → VPN → Add VPN Configuration…: `prefs:root=General&path=VPN/Add%20VPN%20Configuration%E2%80%A6`
- General → VPN → DNS: `prefs:root=General&path=VPN/DNS`
- General → Profiles → (root): `prefs:root=General&path=ManagedConfigurationList`
- General → Profiles → Install Profile: `prefs:root=General&path=ManagedConfigurationList/PurgatoryInstallRequested`
- General → Legal & Regulatory: `prefs:root=General&path=LEGAL_AND_REGULATORY`
- General → Reset: `prefs:root=General&path=Reset`
- Control Center → (root): `prefs:root=ControlCenter`
- Control Center → Customize Controls: `prefs:root=ControlCenter&path=CUSTOMIZE_CONTROLS`
- Action Button: `prefs:root=ACTION_BUTTON`
- Display → (root): `prefs:root=DISPLAY`
- Display → Options: `prefs:root=DISPLAY&path=APPEARANCE_OPTIONS`
- Display → Night Shift: `prefs:root=DISPLAY&path=BLUE_LIGHT_REDUCTION`
- Display → Auto Lock: `prefs:root=DISPLAY&path=AUTOLOCK`
- Display → Text Size: `prefs:root=DISPLAY&path=TEXT_SIZE`
- Home Screen (iPhone): `prefs:root=HOME_SCREEN`
- Home Screen & Dock (iPad) → (root): `prefs:root=HOME_SCREEN_DOCK`
- Home Screen & Dock (iPad) → Multitasking: `prefs:root=HOME_SCREEN_DOCK&path=MULTITASKING`
- Accessibility → (root): `prefs:root=ACCESSIBILITY`
- Accessibility → VoiceOver → (root): `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE`
- Accessibility → VoiceOver → Speech: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/SPEECH_TITLE`
- Accessibility → VoiceOver → Braille → (root): `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/BRAILLE_TITLE`
- Accessibility → VoiceOver → Braille → Output: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/BRAILLE_TITLE/BrailleDisplayOutput`
- Accessibility → VoiceOver → Braille → Input: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/BRAILLE_TITLE/BrailleDisplayInput`
- Accessibility → VoiceOver → Braille → Braille Screen Input: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/BRAILLE_TITLE/BrailleGesturesInput`
- Accessibility → VoiceOver → Braille → Braille Tables → (root): `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/BRAILLE_TITLE/tableIdentifier`
- Accessibility → VoiceOver → Braille → Braille Tables → Language: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/BRAILLE_TITLE/tableIdentifier/DefaultLanguage`
- Accessibility → VoiceOver → Braille → Status Cells: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/BRAILLE_TITLE/STATUS_CELL`
- Accessibility → VoiceOver → Braille → Verbosity → (root): `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/VERBOSITY`
- Accessibility → VoiceOver → Braille → Verbosity → Punctuation → (root): `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/VERBOSITY/voiceOverPunctuationGroup`
- Accessibility → VoiceOver → Braille → Verbosity → Punctuation → Media Descriptions: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/VERBOSITY/voiceOverMediaDescriptions`
- Accessibility → VoiceOver → Audio: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/AUDIO_TITLE`
- Accessibility → VoiceOver → Commands: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/CUSTOMIZE_COMMANDS`
- Accessibility → VoiceOver → Activities → (root): `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/ACTIVITIES`
- Accessibility → VoiceOver → Activities → Programming: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/ACTIVITIES/Programming`
- Accessibility → VoiceOver → Activities → Add Activity…: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/ACTIVITIES/New`
- Accessibility → VoiceOver → Rotor: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/WEB_ROTOR`
- Accessibility → VoiceOver → Rotor Actions: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/ROTOR_ACTIONS`
- Accessibility → VoiceOver → Typing → (root): `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/TYPING_OPTIONS`
- Accessibility → VoiceOver → Typing → Typing Style: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/TYPING_OPTIONS/Typing%20Style`
- Accessibility → VoiceOver → Typing → Phonetic Feedback: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/TYPING_OPTIONS/Phonetic%20Feedback`
- Accessibility → VoiceOver → Typing → Modifier Keys: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/TYPING_OPTIONS/Modifier%20Keys`
- Accessibility → VoiceOver → Typing → Keyboard Interaction Time: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/TYPING_OPTIONS/Keyboard%20Interaction%20Time`
- Accessibility → VoiceOver → Navigate Images: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/INCLUDE_UNLABELED_IMAGES_TITLE`
- Accessibility → VoiceOver → Double-tap Timeout: `prefs:root=ACCESSIBILITY&path=VOICEOVER_TITLE/DOUBLE_TAP_INTERVAL_TITLE`
- Accessibility → Zoom → (root): `prefs:root=ACCESSIBILITY&path=ZOOM_TITLE`
- Accessibility → Zoom → Keyboard Shortcuts: `prefs:root=ACCESSIBILITY&path=ZOOM_TITLE/ZoomKeyboardShortcuts`
- Accessibility → Zoom → Zoom Controller: `prefs:root=ACCESSIBILITY&path=ZOOM_TITLE/ZoomSlug`
- Accessibility → Zoom → Zoom Filter: `prefs:root=ACCESSIBILITY&path=ZOOM_TITLE/ZoomFilter`
- Accessibility → Magnifier: `prefs:root=ACCESSIBILITY&path=MAGNIFIER_TITLE`
- Accessibility → Display & Text Size → (root): `prefs:root=ACCESSIBILITY&path=DISPLAY_AND_TEXT`
- Accessibility → Display & Text Size → Larger Text: `prefs:root=ACCESSIBILITY&path=DISPLAY_AND_TEXT/Larger%20Text`
- Accessibility → Display & Text Size → Color Filters: `prefs:root=ACCESSIBILITY&path=DISPLAY_AND_TEXT/DISPLAY_FILTER_COLOR`
- Accessibility → Motion: `prefs:root=ACCESSIBILITY&path=MOTION_TITLE`
- Accessibility → Spoken Content → (root): `prefs:root=ACCESSIBILITY&path=SPEECH_TITLE`
- Accessibility → Spoken Content → Speech Controller: `prefs:root=ACCESSIBILITY&path=SPEECH_TITLE/SpeechController`
- Accessibility → Spoken Content → Customize Mouse Buttons: `prefs:root=ACCESSIBILITY&path=SPEECH_TITLE/SpeechController/CustomizeMouseButtons`
- Accessibility → Spoken Content → Highlight Content: `prefs:root=ACCESSIBILITY&path=SPEECH_TITLE/QuickSpeakHighlight`
- Accessibility → Spoken Content → Typing Feedback: `prefs:root=ACCESSIBILITY&path=SPEECH_TITLE/TypingFeedback`
- Accessibility → Spoken Content → Voices: `prefs:root=ACCESSIBILITY&path=SPEECH_TITLE/QuickSpeakAccents`
- Accessibility → Audio Descriptions: `prefs:root=ACCESSIBILITY&path=DESCRIPTIVE_VIDEO`
- Accessibility → Touch → (root): `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE`
- Accessibility → Touch → AssistiveTouch → (root): `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE`
- Accessibility → Touch → AssistiveTouch → Customize Top Level Menu: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/AssistiveTouchCustomize`
- Accessibility → Touch → AssistiveTouch → Single-Tap: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/Single-Tap`
- Accessibility → Touch → AssistiveTouch → Idle Opacity: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/IdleOpacity`
- Accessibility → Touch → AssistiveTouch → Devices → (root): `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/AssistiveTouchMouseDevices`
- Accessibility → Touch → AssistiveTouch → Devices → Bluetooth Devices…: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/AssistiveTouchMouseDevices/Bluetooth%20Devices%E2%80%A6`
- Accessibility → Touch → AssistiveTouch → Mouse Keys: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/AssistiveTouchMouseKeys`
- Accessibility → Touch → AssistiveTouch → Pointer Style → (root): `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/ASTMousePointerCustomization`
- Accessibility → Touch → AssistiveTouch → Pointer Style → Color → (root): `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/ASTMousePointerCustomization/Color`
- Accessibility → Touch → AssistiveTouch → Pointer Style → Color → Customize Mouse Buttons: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/ASTMousePointerCustomization/Color/CustomizeMouseButtons`
- Accessibility → Touch → AssistiveTouch → Pointer Style → Auto-Hide: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/ASTMousePointerCustomization/Auto-Hide`
- Accessibility → Touch → AssistiveTouch → Movement Tolerance: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/AIR_TOUCH_TITLE/Movement%20Tolerance`
- Accessibility → Touch → Force/Haptic Touch: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/ForceTouch`
- Accessibility → Touch → Touch Accommodations: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/Touch%20Accommodations`
- Accessibility → Touch → Call Audio Routing → (root): `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/CALL_AUDIO_ROUTING`
- Accessibility → Touch → Call Audio Routing → Auto-Answer Calls: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/CALL_AUDIO_ROUTING/callAudioRoutingAutoAnswer`
- Accessibility → Touch → Back Tap: `prefs:root=ACCESSIBILITY&path=TOUCH_REACHABILITY_TITLE/Back%20Tap`
- Accessibility → Switch Control → (root): `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle`
- Accessibility → Switch Control → Switches → (root): `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/SwitchesIdentifier`
- Accessibility → Switch Control → Switches → Bluetooth Devices…: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/SwitchesIdentifier/BluetoothDevicesIdentifier`
- Accessibility → Switch Control → Recipes → (root): `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/RecipesIdentifier`
- Accessibility → Switch Control → Scanning Style: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Scanning%20Style`
- Accessibility → Switch Control → Pause on First Item: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Pause%20on%20First%20Item`
- Accessibility → Switch Control → Move Repeat: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Move%20Repeat`
- Accessibility → Switch Control → Long Press: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Long%20Press`
- Accessibility → Switch Control → Tap Behavior: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Tap%20Behavior`
- Accessibility → Switch Control → Focused Item After Tap: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Focused%20Item%20After%20Tap`
- Accessibility → Switch Control → Hold Duration: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Hold%20Duration`
- Accessibility → Switch Control → Ignore Repeat: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Ignore%20Repeat`
- Accessibility → Switch Control → Gliding Cursor: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/Gliding%20Cursor`
- Accessibility → Switch Control → Head Tracking: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CameraPointPickerSwitch`
- Accessibility → Switch Control → Speech → (root): `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/SpeechIdentifier`
- Accessibility → Switch Control → Speech → Voices: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/SpeechIdentifier/VoicesIdentifier`
- Accessibility → Switch Control → Menu Items → (root): `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CustomizeMenuIdentifier`
- Accessibility → Switch Control → Menu Items → Top Level: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CustomizeMenuIdentifier/Top%20Level`
- Accessibility → Switch Control → Menu Items → Gestures: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CustomizeMenuIdentifier/Gestures`
- Accessibility → Switch Control → Menu Items → Device: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CustomizeMenuIdentifier/Device`
- Accessibility → Switch Control → Menu Items → Settings: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CustomizeMenuIdentifier/Settings`
- Accessibility → Switch Control → Menu Items → Media Controls: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CustomizeMenuIdentifier/Media%20Controls`
- Accessibility → Switch Control → Saved Gestures: `prefs:root=ACCESSIBILITY&path=ScannerSwitchTitle/CustomGesturesIdentifier`
- Accessibility → Voice Control → (root): `prefs:root=ACCESSIBILITY&path=CommandAndControlTitle`
- Accessibility → Voice Control → Language: `prefs:root=ACCESSIBILITY&path=CommandAndControlTitle/LANGUAGE`
- Accessibility → Voice Control → Customize Commands: `prefs:root=ACCESSIBILITY&path=CommandAndControlTitle/CUSTOMIZE_COMMANDS`
- Accessibility → Voice Control → Vocabulary: `prefs:root=ACCESSIBILITY&path=CommandAndControlTitle/VOCABULARY`
- Accessibility → Voice Control → Overlay: `prefs:root=ACCESSIBILITY&path=CommandAndControlTitle/ALWAYS_SHOW_OVERLAY`
- Accessibility → Home Button: `prefs:root=ACCESSIBILITY&path=HOME_CLICK_TITLE`
- Accessibility → Apple TV Remote: `prefs:root=ACCESSIBILITY&path=Apple%20TV%20Remote`
- Accessibility → Keyboards → (root): `prefs:root=ACCESSIBILITY&path=KEYBOARDS`
- Accessibility → Keyboards → Full Keyboard Access: `prefs:root=ACCESSIBILITY&path=KEYBOARDS/Full%20Keyboard%20Access`
- Accessibility → Keyboards → Key Repeat: `prefs:root=ACCESSIBILITY&path=KEYBOARDS/KEY_REPEAT`
- Accessibility → Keyboards → Sticky Keys: `prefs:root=ACCESSIBILITY&path=KEYBOARDS/STICKY_KEYS`
- Accessibility → Keyboards → Slow Keys: `prefs:root=ACCESSIBILITY&path=KEYBOARDS/SLOW_KEYS`
- Accessibility → Hearing Devices: `prefs:root=ACCESSIBILITY&path=HEARING_AID_TITLE`
- Accessibility → Sound Recognition → (root): `prefs:root=ACCESSIBILITY&path=SOUND_RECOGNITION_TITLE`
- Accessibility → Sound Recognition → Sounds: `prefs:root=ACCESSIBILITY&path=SOUND_RECOGNITION_TITLE/Sounds`
- Accessibility → RTT: `prefs:root=ACCESSIBILITY&path=RTT`
- Accessibility → Audio/Visual: `prefs:root=ACCESSIBILITY&path=AUDIO_VISUAL_TITLE`
- Accessibility → Subtitles & Captioning: `prefs:root=ACCESSIBILITY&path=SUBTITLES_CAPTIONING`
- Accessibility → Guided Access → (root): `prefs:root=ACCESSIBILITY&path=GUIDED_ACCESS_TITLE`
- Accessibility → Guided Access → Passcode Settings: `prefs:root=ACCESSIBILITY&path=GUIDED_ACCESS_TITLE/GuidedAccessSecurityLinkList`
- Accessibility → Guided Access → Time Limits → (root): `prefs:root=ACCESSIBILITY&path=GUIDED_ACCESS_TITLE/GuidedAccessTimeRestrictionsLinkList`
- Accessibility → Guided Access → Time Limits → Sound: `prefs:root=ACCESSIBILITY&path=GUIDED_ACCESS_TITLE/GuidedAccessTimeRestrictionsLinkList/GUIDED_ACCESS_TIME_RESTRICTIONS_SOUND_TITLE`
- Accessibility → Guided Access → Display Auto-Lock: `prefs:root=ACCESSIBILITY&path=GUIDED_ACCESS_TITLE/GuidedAccessAutoLockTime`
- Accessibility → Siri: `prefs:root=ACCESSIBILITY&path=SIRI_SETTINGS_TITLE`
- Accessibility → Accessibility Shortcut: `prefs:root=ACCESSIBILITY&path=TRIPLE_CLICK_TITLE`
- Wallpaper: `prefs:root=Wallpaper`
- StandBy: `prefs:root=AMBIENT`
- Siri → (root): `prefs:root=SIRI` or `prefs-siri-shortcuts:root`
- Siri → Language: `prefs:root=SIRI&path=LANGUAGE_ID`
- Siri → Voice: `prefs:root=SIRI&path=VOICE_ID`
- Siri → Siri Responses: `prefs:root=SIRI&path=VOICE_FEEDBACK_ID`
- Siri → Siri & Dictation History: `prefs:root=SIRI&path=HISTORY`
- Siri → [App Name]: `prefs:root=SIRI&path=[App Bundle ID]`
- Apple Pencil: `prefs:root=Pencil`
- Face/Touch ID & Passcode → (root): `prefs:root=PASSCODE`
- Face/Touch ID & Passcode → Require Passcode: `prefs:root=PASSCODE&path=PASSCODE_REQ`
- Emergency SOS: `prefs:root=EMERGENCY_SOS`
- Exposure Notifications: `prefs:root=EXPOSURE_NOTIFICATION`
- Battery → (root): `prefs:root=BATTERY_USAGE`
- Battery → Battery Health: `prefs:root=BATTERY_USAGE&path=BATTERY_HEALTH`
- Privacy → (root): `prefs:root=Privacy`
- Privacy → Location Services → (root): `prefs:root=Privacy&path=LOCATION`
- Privacy → Location Services → Share My Location → (root): `prefs:root=Privacy&path=LOCATION/LOCATION_SHARING`
- Privacy → Location Services → Share My Location → [Family Member Name]: `prefs:root=Privacy&path=LOCATION/LOCATION_SHARING/[URL-encoded Family Member Name]`
- Privacy → Location Services → [App Name]: `prefs:root=Privacy&path=LOCATION/[App Bundle ID]`
- Privacy → Location Services → System Services: `prefs:root=Privacy&path=LOCATION/SYSTEM_SERVICES`
- Privacy → Tracking: `prefs:root=Privacy&path=USER_TRACKING`
- Privacy → Contacts: `prefs:root=Privacy&path=CONTACTS`
- Privacy → Calendars: `prefs:root=Privacy&path=CALENDARS`
- Privacy → Reminders: `prefs:root=Privacy&path=REMINDERS`
- Privacy → Photos → (root): `prefs:root=Privacy&path=PHOTOS`
- Privacy → Photos → [App Name]: `prefs:root=Privacy&path=PHOTOS/[App Bundle ID]`
- Privacy → Bluetooth: `prefs:root=Privacy&path=BT_PERIPHERAL`
- Privacy → Local Network: `prefs:root=Privacy&path=LOCAL_NETWORK`
- Privacy → Microphone: `prefs:root=Privacy&path=MICROPHONE`
- Privacy → Speech Recognition: `prefs:root=Privacy&path=SPEECH_RECOGNITION`
- Privacy → Camera: `prefs:root=Privacy&path=CAMERA`
- Privacy → Health: `prefs:root=Privacy&path=HEALTH`
- Privacy → HomeKit: `prefs:root=Privacy&path=WILLOW`
- Privacy → Media & Apple Music: `prefs:root=Privacy&path=MEDIALIBRARY`
- Privacy → Motion & Fitness: `prefs:root=Privacy&path=MOTION`
- Privacy → Analytics & Improvements: `prefs:root=Privacy&path=PROBLEM_REPORTING`
- Privacy → Advertising: `prefs:root=Privacy&path=ADVERTISING`
- Privacy → Record App Activity: `prefs:root=Privacy&path=PRIVACY_REPORT`
- App Store → (root): `prefs:root=STORE`
- App Store → App Downloads: `prefs:root=STORE&path=App%20Downloads`
- App Store → Video Autoplay: `prefs:root=STORE&path=Video%20Autoplay`
- Wallet → (root): `prefs:root=PASSBOOK`
- Wallet → Add Card: `prefs:root=PASSBOOK&path=Add%20Card`
- Passwords → (root): `prefs:root=PASSWORDS`
- Passwords → [Search Term]: `prefs:root=PASSWORDS&search=[Search Term]`
- Passwords & Accounts → (root): `prefs:root=ACCOUNTS_AND_PASSWORDS`
- Passwords & Accounts → Add Account → (root): `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT`
- Passwords & Accounts → Add Account → iCloud: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/iCloud`
- Passwords & Accounts → Add Account → Google: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/Gmail`
- Passwords & Accounts → Add Account → AOL: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/AOL`
- Passwords & Accounts → Add Account → Outlook: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/Outlook`
- Passwords & Accounts → Add Account → Other → (root): `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/OTHER`
- Passwords & Accounts → Add Account → Other → Add Mail Account: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/OTHER/Add%20Mail%20Account`
- Passwords & Accounts → Add Account → Other → Add LDAP Account: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/OTHER/Add%20LDAP%20Account`
- Passwords & Accounts → Add Account → Other → Add CardDAV Account: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/OTHER/Add%20CardDAV%20Account`
- Passwords & Accounts → Add Account → Other → Add CalDAV Account: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/OTHER/Add%20CalDAV%20Account`
- Passwords & Accounts → Add Account → Other → Add Subscribed Calendar: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=ADD_ACCOUNT/OTHER/Add%20Subscribed%20Calendar`
- Passwords & Accounts → Fetch New Data: `prefs:root=ACCOUNTS_AND_PASSWORDS&path=FETCH_NEW_DATA`
- Mail → (root): `prefs:root=MAIL`
- Mail → Notifications: `prefs:root=MAIL&path=NOTIFICATIONS`
- Mail → Preview: `prefs:root=MAIL&path=Preview`
- Mail → Swipe Options → (root): `prefs:root=MAIL&path=Swipe%20Options`
- Mail → Swipe Options → Swipe Left: `prefs:root=MAIL&path=Swipe%20Options/Swipe%20Left`
- Mail → Swipe Options → Swipe Right: `prefs:root=MAIL&path=Swipe%20Options/Swipe%20Right`
- Mail → Blocked: `prefs:root=MAIL&path=Blocked`
- Mail → Muted Thread Action: `prefs:root=MAIL&path=Muted%20Thread%20Action`
- Mail → Blocked Sender Options: `prefs:root=MAIL&path=Blocked%20Sender%20Options`
- Mail → Mark Addresses: `prefs:root=MAIL&path=Mark%20Addresses`
- Mail → Increase Quote Level: `prefs:root=MAIL&path=Increase%20Quote%20Level`
- Mail → Include Attachments with Replies: `prefs:root=MAIL&path=Include%20Attachments%20with%20Replies`
- Mail → Signature: `prefs:root=MAIL&path=Signature`
- Mail → Default Account: `prefs:root=MAIL&path=Default%20Account`
- Contacts → (root): `prefs:root=CONTACTS`
- Contacts → Siri & Search: `prefs:root=CONTACTS&path=SIRI_AND_SEARCH`
- Contacts → Sort Order: `prefs:root=CONTACTS&path=ContactsSortOrder`
- Contacts → Display Order: `prefs:root=CONTACTS&path=PersonNameOrder`
- Contacts → Short Name: `prefs:root=CONTACTS&path=PersonShortName`
- Contacts → My Info: `prefs:root=CONTACTS&path=MeCard`
- Calendar → (root): `prefs:root=CALENDAR`
- Calendar → Siri & Search: `prefs:root=CALENDAR&path=SIRI_AND_SEARCH`
- Calendar → Time Zone Override: `prefs:root=CALENDAR&path=TimeZoneCityArray`
- Calendar → Alternate Calendars: `prefs:root=CALENDAR&path=Alternate%20Calendars`
- Calendar → Sync: `prefs:root=CALENDAR&path=Sync`
- Calendar → Default Alert Times: `prefs:root=CALENDAR&path=Default%20Alert%20Times`
- Calendar → Start Week On: `prefs:root=CALENDAR&path=com.apple.mobilecal`
- Calendar → Default Calendar: `prefs:root=CALENDAR&path=Default%20Calendar`
- Notes → (root): `prefs:root=NOTES`
- Notes → Siri & Search: `prefs:root=NOTES&path=SIRI_AND_SEARCH`
- Notes → Default Account: `prefs:root=NOTES&path=Default%20Account`
- Notes → Password: `prefs:root=NOTES&path=Password`
- Notes → Sort Notes By: `prefs:root=NOTES&path=Sort%20Notes%20By`
- Notes → New Notes Start With: `prefs:root=NOTES&path=New%20Notes%20Start%20With`
- Notes → Sort Checked Items: `prefs:root=NOTES&path=Sort%20Checked%20Items`
- Notes → Lines & Grids: `prefs:root=NOTES&path=Lines%20%26%20Grids`
- Notes → Note Backgrounds: `prefs:root=NOTES&path=Note%20Backgrounds`
- Notes → Access Notes from Lock Screen: `prefs:root=NOTES&path=Access%20Notes%20from%20Lock%20Screen`
- Reminders → (root): `prefs:root=REMINDERS`
- Reminders → Siri & Search: `prefs:root=REMINDERS&path=SIRI_AND_SEARCH`
- Reminders → Default List: `prefs:root=REMINDERS&path=DEFAULT_LIST`
- Voice Memos → (root): `prefs:root=VOICE_MEMOS`
- Voice Memos → Siri & Search: `prefs:root=VOICE_MEMOS&path=SIRI_AND_SEARCH`
- Voice Memos → Clear Deleted: `prefs:root=VOICE_MEMOS&path=RCVoiceMemosRecentlyDeletedWindowKey`
- Voice Memos → Audio Quality: `prefs:root=VOICE_MEMOS&path=RCVoiceMemosAudioQualityKey`
- Phone → (root): `prefs:root=Phone`
- Phone → Respond with Text: `prefs:root=Phone&path=Respond%20with%20Text`
- Phone → Silence Unknown Callers: `prefs:root=Phone&path=SILENCE_CALLS`
- Messages: `prefs:root=MESSAGES`
- FaceTime → (root): `prefs:root=FACETIME`
- FaceTime → Siri & Search: `prefs:root=FACETIME&path=SIRI_AND_SEARCH`
- Focus (Do Not Disturb) → (root): `prefs:root=DO_NOT_DISTURB`
- Focus (Do Not Disturb) → Allow Calls From: `prefs:root=DO_NOT_DISTURB&path=Allow%20Calls%20From`
- Focus (Do Not Disturb) → Auto-Reply To: `prefs:root=DO_NOT_DISTURB&path=DRIVER_MODE_AUTOREPLY`
- Focus (Do Not Disturb) → Auto-Reply: `prefs:root=DO_NOT_DISTURB&path=DRIVER_MODE_AUTOREPLY_MESSAGE`
- Safari → (root): `prefs:root=SAFARI`
- Safari → AutoFill → (root): `prefs:root=SAFARI&path=AUTO_FILL`
- Safari → AutoFill → Saved Credit Cards: `prefs:root=SAFARI&path=AUTO_FILL/CreditCardList`
- Safari → Content Blockers: `prefs:root=SAFARI&path=CONTENT_BLOCKERS`
- Safari → Downloads: `prefs:root=SAFARI&path=DOWNLOADS`
- Safari → Close Tabs: `prefs:root=SAFARI&path=Close%20Tabs`
- Safari → Hide IP Address: `prefs:root=SAFARI&path=Hide%20IP%20Address`
- Safari → Clear History and Website Data: `prefs:root=SAFARI&path=CLEAR_HISTORY_AND_DATA`
- Safari → Page Zoom: `prefs:root=SAFARI&path=Page%20Zoom`
- Safari → Request Desktop Website: `prefs:root=SAFARI&path=Request%20Desktop%20Website`
- Safari → Reader: `prefs:root=SAFARI&path=Reader`
- Safari → Camera: `prefs:root=SAFARI&path=Camera`
- Safari → Microphone: `prefs:root=SAFARI&path=Microphone`
- Safari → Location: `prefs:root=SAFARI&path=Location`
- Safari → Advanced: `prefs:root=SAFARI&path=ADVANCED`
- News → (root): `prefs:root=NEWS`
- News → Acknowledgements: `prefs:root=NEWS&path=Acknowledgements`
- Translate: `prefs:root=TRANSLATE`
- Maps → (root): `prefs:root=MAPS`
- Maps → Driving: `prefs:root=MAPS&path=Driving`
- Maps → Walking (iPhone): `prefs:root=MAPS&path=Walking`
- Maps → Transit: `prefs:root=MAPS&path=Transit`
- Maps → Cycling: `prefs:root=MAPS&path=Cycling`
- Compass: `prefs:root=COMPASS`
- Measure → (root): `prefs:root=MEASURE`
- Measure → Siri & Search: `prefs:root=MEASURE&path=SIRI_AND_SEARCH`
- Shortcuts → (root): `prefs:root=SHORTCUTS`
- Shortcuts → Legal Notices: `prefs:root=SHORTCUTS&path=Legal%20Notices`
- Health → (root): `prefs:root=HEALTH`
- Health → Siri & Search: `prefs:root=HEALTH&path=SIRI_AND_SEARCH`
- Home: `prefs:root=HOMEKIT`
- Journal → (root): `prefs:root=JOURNAL`
- Journal → Journaling Schedule: `prefs:root=JOURNAL&path=journalingSchedule`
- Journal → Lock Journal `prefs:root=JOURNAL&path=lockJournal`
- Music → (root): `prefs:root=MUSIC`
- Music → Cellular Data: `prefs:root=MUSIC&path=com.apple.Music%3ACellularData`
- Music → Dolby Atmos: `prefs:root=MUSIC&path=com.apple.Music%3AAtmos`
- Music → Audio Quality: `prefs:root=MUSIC&path=com.apple.Music%3AAudioQuality`
- Music → EQ: `prefs:root=MUSIC&path=com.apple.Music%3AEQ`
- Music → Optimize Storage: `prefs:root=MUSIC&path=com.apple.Music%3AOptimizeStorage`
- Music → Volume Limit: `prefs:root=MUSIC&path=com.apple.Music%3AVolumeLimit`
- TV → (root): `prefs:root=TVAPP`
- TV → Cellular: `prefs:root=TVAPP&path=com.apple.videos%3AVideosPlaybackQualityCellularSetting`
- TV → Wi-Fi: `prefs:root=TVAPP&path=com.apple.videos%3AVideosPlaybackQualitySetting`
- TV → Siri & Search: `prefs:root=TVAPP&path=SIRI_AND_SEARCH`
- TV → Video Definition: `prefs:root=TVAPP&path=com.apple.videos%3APreferredPurchaseResolution`
- Photos → (root): `prefs:root=Photos`
- Photos → Cellular Data: `prefs:root=Photos&path=CellularDataLinkList`
- Camera → (root): `prefs:root=CAMERA`
- Camera → Formats: `prefs:root=CAMERA&path=CameraFormatsSettingsList`
- Camera → Record Video: `prefs:root=CAMERA&path=Record%20Video`
- Camera → Record Slo-mo: `prefs:root=CAMERA&path=Record%20Slo-mo`
- Camera → Preserve Settings: `prefs:root=CAMERA&path=CameraPreserveSettingsSwitch`
- Books → (root): `prefs:root=IBOOKS`
- Books → Siri & Search: `prefs:root=IBOOKS&path=SIRI_AND_SEARCH`
- Books → Skip Forward: `prefs:root=IBOOKS&path=BKAudioBookSkipForward`
- Books → Skip Back: `prefs:root=IBOOKS&path=BKAudioBookSkipBackward`
- Books → Acknowledgements: `prefs:root=IBOOKS&path=Acknowledgements`
- Podcasts: `prefs:root=com.apple.podcasts`
- Game Center → (root): `prefs:root=GAMECENTER`
- Game Center → Add Friends: `prefs:root=GAMECENTER&path=Add%20Friends`
- Game Center → Terms and Conditions: `prefs:root=GAMECENTER&path=Terms%20and%20Conditions`
- TV Provider: `prefs:root=VIDEO_SUBSCRIBER`
- Developer → (root): `prefs:root=DEVELOPER_SETTINGS`
- Developer → Instruments/Logging: `prefs:root=DEVELOPER_SETTINGS&path=DTInstrumentsSettings`
- Developer → Network Link Conditioner: `prefs:root=DEVELOPER_SETTINGS&path=NLC`
- Developer → Multipath Networking: `prefs:root=DEVELOPER_SETTINGS&path=MULTI_PATH_AGG`
- Developer → Fill Rate: `prefs:root=DEVELOPER_SETTINGS&path=FILL_RATE`
- Developer → Ad Refresh Rate: `prefs:root=DEVELOPER_SETTINGS&path=AD_REFRESH_RATE`
- Developer → TV Provider: `prefs:root=DEVELOPER_SETTINGS&path=VideoSubscriberAccountSettings`
- Settings For App…: `prefs:root=[App Bundle ID]`
