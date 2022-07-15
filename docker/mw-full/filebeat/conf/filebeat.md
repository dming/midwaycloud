# filebeat 学习笔记

1. yields.yml 是用来描述 Index Template 的，这是个通用版的 template，包含市面上绝大多数的常用软件 log 设置。应该是要作为模板去生成对应的 template 的，其中涉及很多的 alias，应该是有一个应用去生成对应的 template，但我还没确定是哪个软件，感觉大概可能是 ECS 这个东西。

2. filebeat 会收集 log 数据，eg:通过 log 文件或其他，然后上传到 ES 上面，在这期间，会应用上 pipeline，这个 pipeline 通常就是自定义解析 message field，让用户自定义生成所需的额外的 field。

3. 设置应用时生成的 doc 由 filebeat 默认 fields 加上 pipeline 生成的额外数据。这个 fields 的数量是远远少于 yields.yml 里描述的 yield 数量的，因为 yields.yml 描述的是上百个 app 的 fields，共 6000+个。

4. 可以通过设置 filebeat.inputs.processors:- add_fields 去给某个特殊变量设定 log-app-type 值来区分出不同的 log 来自哪个 app。不然真的会全部都在一个 index 里很难区分的。然后再 kibana 里通过 dashboard 的 filter 就可以按 app 去筛选出所需的 log 数据了。

5. Index Templates && Index Lifecycle Policies 需要事先在 ES 里创建好。pipeline 也是。也要设置好 Index Patterns。特别要注意，要设置 ilm.enabled: false，不然会忽略掉 template.name & template.pattern，而使用默认的 filebeat。

6. Index Templates && Index Lifecycle Policies 直接从 filebeat 前缀文件里直接 clone 一份即可，后面再修改一点点即可。
