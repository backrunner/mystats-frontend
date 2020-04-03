# myStats API 使用文档

## AppKey

在使用 API 前，你需要获取应用对应的 AppKey，API 只把应用的 AppKey 作为其唯一标识进行辨识。

在添加应用后，你可以通过应用管理进入应用详情，并在应用详情的顶部获得 AppKey。

请妥善保管你的 AppKey，如果你认为你的统计数据受到了污染，请在“应用管理 -> 应用列表 -> 编辑”处重置 AppKey。

**注意：现阶段我们并不会保有已经过时的 AppKey，重置将立即生效，你将因此丢失一段时间的统计数据，请谨慎操作，并选择好重置的时机**

**一旦 Appkey 重置，系统将不再接受任何基于旧 AppKey提交的记录**

## API

本站仅提供用于提交数据的 API，数据的查看、管理、统计等均需要在站点内进行，无 API 可用。

API地址如下：

```
https://mystats.pwp.app/api/submit/install
https://mystats.pwp.app/api/submit/uninstall
```

所有 API 均只支持 POST 方法，且返回标准的 application/json，请不要使用 GET、JSONP 的方式调用 API。

### 统一回复

所有的 API 均会返回一个统一的包装格式，如下所示：

| 参数名 | 类型 | 描述 |
| ---- | ---- | ---- |
| code | int | 代码，相关释义和 HTTP 状态码一致 |
| message | String | 通常为错误信息，调用成功默认返回信息 success |
| data | Object | 如有返回数据的必要，data 即为返回的数据 |

建议使用code判断API调用是否成功

### 提交安装记录

**提交参数**

| 参数名 | 类型 | 描述 | 必选 |
| ---- | ---- | ---- | ---- |
| appKey | String | 与应用对应的 AppKey | 是 |
| branch | String | 应用分支（如 win64、win32）等，自行定义 | 是 |
| version | String | 应用版本，请确保版本号符合 "major.minor.path" 的格式，例：1.0.0，0.2.1，4.2.3 | 是 |
| uuid | String | 自行定义，确保可以区分每个客户端或每个用户 | 是 |

**回复**

仅记录提交成功时会返回 code=200 的成功回复。

多次提交同样的记录不会造成记录数据上的冗余，你可以更为灵活地使用 API。

### 提交卸载记录

**提交参数和回复与提交安装记录一致。**

重复提交卸载和反复按“卸载 - 安装”的方式提交记录并不会造成记录数据上的冗余，你可以更为灵活地使用 API。
