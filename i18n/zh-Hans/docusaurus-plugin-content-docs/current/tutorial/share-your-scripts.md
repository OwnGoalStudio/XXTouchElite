---
sidebar_position: 6
---

# 分享你的脚本

现在你已经创建了第一个脚本，可以将它分享给全世界！你可以通过将你的 Lua 脚本上传为 [GitHub Gist](https://gist.github.com) 的公开文件来实现。这将允许其他人查看你的代码，甚至对其进行贡献。

![Share_Your_Scripts.003](./img/Share_Your_Scripts.003.png)

## 加密你的脚本

如果你想分享脚本但又不希望其他人看到你的代码，可以使用“加密”操作来加密你的脚本。这将创建一个新文件，其名称与原始脚本相同，但文件扩展名为 `.xxt`。你可以将此文件分享给其他人，他们可以运行它，但无法查看或修改代码。

![Share_Your_Scripts.001](./img/Share_Your_Scripts.001.png)

:::warning
加密脚本会被编译为使用修改版 `luac` 编译器的**字节码**，这意味着它们并非 100% 安全。然而，这仍然是混淆代码并防止他人轻易修改的好方法。
:::

![Share_Your_Scripts.002](./img/Share_Your_Scripts.002.png)
