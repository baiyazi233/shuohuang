# README

## 启动命令

./main -f test_config.json
启动后监听7001端口

## sql

导入sql文件到数据库

## 配置文件

### blockchain

可以忽略

### mysql

按需配置，明文密码

## 请求示例

curl http://127.0.0.1:7001/api -d '{"Action": "DescribeAssetList"}'

## 返回结果

```json
{
    "Response": {
        "TotalCount": 499,
        "AssetList": [
            {
                "Id": 1,
                "Code": 1100000000,
                "Name": "房屋",
                "Unit": "",
                "Mnemonic": "fw"
            },
            {
                "Id": 2,
                "Code": 1101000000,
                "Name": "房屋-生产厂房",
                "Unit": "",
                "Mnemonic": "fw-sccf"
            },
            {
                "Id": 3,
                "Code": 1101010000,
                "Name": "房屋-生产厂房-一般生产用房",
                "Unit": "",
                "Mnemonic": "fw-sccf-ybscyf"
            },
            {
                "Id": 4,
                "Code": 1101020000,
                "Name": "房屋-生产厂房-受腐蚀生产用房",
                "Unit": "",
                "Mnemonic": "fw-sccf-sfsscyf"
            },
            {
                "Id": 5,
                "Code": 1101030000,
                "Name": "房屋-生产厂房-受强腐蚀生产用房",
                "Unit": "",
                "Mnemonic": "fw-sccf-sqfsscyf"
            },
            {
                "Id": 6,
                "Code": 1101040000,
                "Name": "房屋-生产厂房-简易生产用房",
                "Unit": "",
                "Mnemonic": "fw-sccf-jyscyf"
            },
            {
                "Id": 7,
                "Code": 1101050000,
                "Name": "房屋-生产厂房-仓库等其他生产用房",
                "Unit": "",
                "Mnemonic": "fw-sccf-ckdqtscyf"
            },
            {
                "Id": 8,
                "Code": 1102000000,
                "Name": "房屋-管理办公用房",
                "Unit": "",
                "Mnemonic": "fw-glbgyf"
            },
            {
                "Id": 9,
                "Code": 1102010000,
                "Name": "房屋-管理办公用房-钢混结构",
                "Unit": "",
                "Mnemonic": "fw-glbgyf-ghjg"
            },
            {
                "Id": 10,
                "Code": 1102020000,
                "Name": "房屋-管理办公用房-砖混结构",
                "Unit": "",
                "Mnemonic": "fw-glbgyf-zhjg"
            }
        ]
    }
}                       
```