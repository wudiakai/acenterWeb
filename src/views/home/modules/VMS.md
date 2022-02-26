# VMS 使用说明

## 引入方式
依赖的jar包为android.car.jar和vms.jar。

``` gradle
dependencies {
    implementation files('libs/android.car.jar')
    implementation files('libs/vms.jar')
}
```

需要申请权限Car.PERMISSION_VMS_PUBLISHER和(或)Car.PERMISSION_VMS_SUBSCRIBER。

``` xml
<uses-permission android:name="android.car.permission.VMS_PUBLISHER" />
<uses-permission android:name="android.car.permission.VMS_SUBSCRIBER" />
```

## 示例代码

``` java
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import android.car.vms.VmsLayer;
import com.neusoft.naac.vms.Vms;
import com.neusoft.naac.vms.VmsManager;

public class VMSActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 取得manager
        VmsManager manager = new VmsManager(this);

        // 注册回调函数，这里简单打印一下log
        // 你的回调函数应该包含针对具体消息的具体处理
        // 消息格式请参考 VMS功能参数对照表.xlsx
        manager.registerPacketCallback((VmsLayer layer, String packet) -> Log.i("AVM", packet));

        // 如果你是订阅者，你可能希望订阅一些消息
        manager.getClient()
                .setSubscriptions(Vms.LAYER_AUDIO_FOCUS);
        
        // 如果你是发布者，你可能希望发布一些消息，可以级联调用
        manager.getClient()
                .setProviderOfferings(Vms.LAYER_AUDIO_FOCUS)
                .publishPacket(Vms.LAYER_AUDIO_FOCUS, "hello world");
    }

    @Override
    protected void onDestroy() {
        // 移除回调函数
        manager.unregisterPacketCallback();

        super.onDestroy();
    }
}
```
