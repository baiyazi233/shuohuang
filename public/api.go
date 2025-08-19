// 每个请求默认增加Action字段，区分不同的api，如curl http://127.0.0.1:7001/api -d '{"Action": "DescribeAssetList", "Code": 99999}'

// 1. {"Action": "DescribeAssetList"}
type DescribeAssetListReq struct {
	Code     int64  `json:"Code"`
	Name     string `json:"Name"`
	Mnemonic string `json:"Mnemonic"`
	Unit     string `json:"Unit"`
	Offset   int64  `json:"Offset"`
}

type DescribeAssetListResp struct {
	TotalCount int64 `json:"TotalCount"`
	AssetList  []*db.AssetModel
}

type AssetModel struct {
	Id       int64  `gorm:"column:id;primary_key"`
	Code     int64  `gorm:"column:code"` 
	Name     string `gorm:"column:name"`
	Unit     string `gorm:"column:unit"`
	Mnemonic string `gorm:"column:mnemonic"`
}



// 2. {"Action": "DescribeDeviceBasicInfoList"}
type DescribeDeviceBasicInfoListReq struct {
	AssetCode int64 `json:"AssetCode"  binding:"required"`
	Offset    int64 `json:"Offset"`
}
type DescribeDeviceBasicInfoListResp struct {
	DeviceBasicInfoList []*DeviceBasicInfo `json:"DeviceBasicInfoList"`
	TotalCount          int64              `json:"TotalCount"`
}

type DeviceBasicInfo struct {
	Name             string    `json:"Name"`
	DeviceID         string    `json:"DeviceID"`
	Manufacturer     string    `json:"Manufacturer"`
	Model            string    `json:"Model"`
	PurchaseDate     time.Time `json:"PurchaseDate"`
	LifeSpan         int       `json:"LifeSpan"`
	MaintainTimes    int       `json:"MaintainTimes"`
	LastMaintainTime string    `json:"LastMaintainTime"`
	ScrapReason      string    `json:"ScrapReason"`
	ScrapAction      string    `json:"ScrapAction"`
	ScrapTime        string    `json:"ScrapTime"`
}

// 3. {"Action": "CreateDeviceInfo"}
type CreateDeviceInfoReq struct {
	AssetCode    int64  `json:"AssetCode"`
	Name         string `json:"Name"`
	DeviceID     string `json:"DeviceID"`
	Manufacturer string `json:"Manufacturer"`
	Model        string `json:"Model"`
	PurchaseDate string `json:"PurchaseDate"`
	LifeSpan     int    `json:"LifeSpan"`
}

type CreateDeviceInfoResp struct{}

// 4. {"Action": "DescribeDeviceMaintainInfoList"}
type DescribeDeviceMaintainInfoListReq struct {
	AssetCode int64  `json:"AssetCode"`
	Offset    int64  `json:"Offset"`
	SearchKey string `json:"SearchKey"`
}

type DescribeDeviceMaintainInfoListResp struct {
	Data       []*DeviceMaintainInfo
	TotalCount int64 `json:"TotalCount"`
}

type DeviceMaintainInfo struct {
	Name            string `json:"Name"`
	DeviceID        string `json:"DeviceID"`
	Manufacturer    string `json:"Manufacturer"`
	Model           string `json:"Model"`
	PurchaseDate    string `json:"PurchaseDate"`
	MaintainHistory string `json:"MaintainHistory"` 
	MaintainTime    string `json:"MaintainTime"`    // latest maintain operation time
}

// 5. {"Action": "CreateDeviceMaintainInfo"}
type CreateDeviceMaintainInfoReq struct {
	AssetCode       int64  `json:"AssetCode"`
	DeviceID        string `json:"DeviceID"`
	Name            string `json:"Name"`
	MaintainDetails string `json:"MaintainDetails"`
	MaintainTime    string `json:"MaintainTime"`
}

type CreateDeviceMaintainInfoResp struct{}

// 6. {"Action": "CreateDeviceScrapInfo"}
type CreateDeviceScrapInfoReq struct {
	AssetCode int64  `json:"AssetCode"`
	DeviceID  string `json:"DeviceID"`
	Name      string `json:"Name"`
	Reason    string `json:"Reason"`
	Action    string `json:"Action"`
	Time      string `json:"Time"`
}

type CreateDeviceScrapInfoResp struct{}

// 7. {"Action": "DescribeAwarenessList"}
type DescribeAwarenessListReq struct {
	Content   string `json:"Content"`   // like %Content%
	Status    []int  `json:"Status"`    // -1 -> all
	Type      []int  `json:"Type"`      // -1 -> all
	StartTime string `json:"StartTime"` // check start<=end
	EndTime   string `json:"EndTime"`
	Offset    int    `json:"Offset"`
}

type DescribeAwarenessListResp struct {
	TotalCount    int64 `json:"TotalCount"`
	AwarenessList []*db.AwarenessModel
}

type AwarenessModel struct {
	Id         int64     `gorm:"column:id;primary_key"`
	Content    string    `gorm:"column:content"`
	AwareTime  time.Time `gorm:"column:aware_time"`
	Type       int       `gorm:"column:type"`
	Status     int       `gorm:"column:status"`
	AssignTime time.Time `gorm:"column:assign_time"`
	Assignee   string    `gorm:"column:assignee"`
	Result     int       `gorm:"column:result"`
	Escalate   int       `gorm:"column:escalate"`
	CreateTime time.Time `gorm:"column:create_time"`
	UpdateTime time.Time `gorm:"column:update_time"`
}

// 8. {"Action": "CreateAwarenessInfo"}
type CreateAwarenessInfoReq struct {
	Content  string `json:"Content"`
	Time     string `json:"Time"`
	Type     int    `json:"Type"`   // 0-检测预警
	Status   int    `json:"Status"` // 0-未分配，1-已分配
	Assignee string `json:"Assignee"`
}

type CreateAwarenessInfoResp struct{}
