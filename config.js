**config
//如果您的数据馈送没有实现此调用（不响应或发送404错误），则使用默认配置。这是默认配置：
{
    supported_resolutions ： [ ' 1 '，' 5 '，' 15 '，' 30 '，' 60 '，' 1D '，' 1W '，' 1M ' ]，
    supports_group_request ： true，
    supports_marks ： false，
    supports_search ： false，
    supports_timescale_marks ： false，
}





**time   //数字unix时间没有毫秒
例： 1445324591




**symbols?symbol=<symbol>

例如：GET /symbols?symbol=AAL，GET /symbols?symbol=NYSE:MSFT
//如果您发送了数据馈送supports_group_request: false和supports_search: true配置数据，则会请求该呼叫。





**history 
请求： GET /history?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>

symbol：符号名称或代码。
from：最左边所需栏的unix时间戳（UTC）
to：最右边所需栏的unix时间戳（UTC）
resolution：字符串
预计响应将成为下面列出的一些属性的对象。如上所述，每个属性都被视为表格列。


s：状态码。预期值：ok| error|no_data
errmsg： 错误信息。只有当时应该存在s = 'error'
t：酒吧时间。Unix时间戳（UTC）
c：收盘价
o：开盘价格（可选）
h：高价格（可选）
l：低价格（可选）
v：卷（可选）
nextTime：如果no_data在所请求的时间段内没有数据（状态码为），则下一栏的时间（可选）

{
   s: "ok",
   t: [1386493512, 1386493572, 1386493632, 1386493692],
   c: [42.1, 43.4, 44.3, 42.8],
   o: [41.0, 42.9, 43.7, 44.5],
   h: [43.0, 44.1, 44.8, 44.5],
   l: [40.4, 42.1, 42.8, 42.3],
   v: [12000, 18500, 24000, 45000]
}




**marks
 GET /marks?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>
 
 symbol：符号名称或代码。
from：最左边可见条的unix时间戳（UTC）
to：最右侧可见条的unix时间戳（UTC）
resolution：字符串

预计响应将成为下面列出的一些属性的对象

{
    id: [array of ids],
    time: [array of times],
    color: [array of colors],
    text: [array of texts],
    label: [array of labels],
    labelFontColor: [array of label font colors],
    minSize: [array of minSizes],
}
备注：如果您的数据馈送supports_marks: true在配置数据中发送，则会请求该呼叫。





**timescale_marks

Request: GET /timescale_marks?symbol=<ticker_name>&from=<unix_timestamp>&to=<unix_timestamp>&resolution=<resolution>

symbol：符号名称或代码。
from：unix时间戳（UTC）或最左侧的可视栏
to：unix timestamp（UTC）或最右边的可视栏
resolution：字符串

预期响应是下面列出属性的对象数组。

id：标记的唯一标识符
color：rgba颜色
label：要显示在一个圆圈中的字母
time：unix时间
tooltip：工具提示文本


备注：如果您的数据馈送supports_timescale_marks: true在配置数据中发送，则会请求该呼叫。






**search

GET /search?query=<query>&type=<type>&exchange=<exchange>&limit=<limit>

query：字符串。用户在符号搜索编辑框中键入的文本
type：字符串。您的后端支持的符号类型之一
exchange：字符串。其中一个由您的后端支持的交易所
limit： 整数。响应中符号的最大数量

例： GET /search?query=AA&type=stock&exchange=NYSE&limit=15
备注：如果您发送了数据馈送supports_group_request: false和supports_search: true配置数据，则会请求该呼叫。
